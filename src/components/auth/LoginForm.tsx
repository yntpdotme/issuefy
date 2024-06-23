'use client';

import {BackButton} from '@/components/auth/BackButton';
import {CardWrapper} from '@/components/auth/CardWrapper';
import {PasswordInput} from '@/components/auth/PasswordInput';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import {FormItem} from '@/components/ui/FormItem';
import {FormMessage} from '@/components/ui/FormMessage';
import {Input} from '@/components/ui/Input';
import {LoginSchema} from '@/schemas';
import {login} from '@/server/actions/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@radix-ui/themes';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider'
      : '';

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    handleSubmit,
    register,
    formState: {errors},
    setFocus,
    reset,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await login(data, callbackUrl);
      if (res?.error) {
        setError(res.error);
      }
      if (res?.success) {
        reset();
        router.push(res.redirect);
        setSuccess(res.success);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial
      showGuestLogin
    >
      <form
        className="mb-1 flex flex-col gap-6 px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormItem label="Email" id="email">
          <Input
            type="email"
            placeholder="john.doe@example.com"
            register={register('email')}
            disabled={isPending}
          />
          <FormMessage error={errors.email?.message} />
        </FormItem>

        <FormItem label="Password" id="password">
          <PasswordInput register={register('password')} disabled={isPending} />
          <FormMessage error={errors.password?.message} />
        </FormItem>

        <BackButton
          href="/auth/reset"
          label="Forgot password?"
          className="max-w-fit"
        />

        <FormSuccess message={success} />

        <FormError message={error || urlError} />

        <Button
          type="submit"
          disabled={isPending}
          className="-mt-2 h-9 w-full cursor-pointer bg-black dark:bg-white dark:text-black"
        >
          Login
        </Button>
      </form>
    </CardWrapper>
  );
};
