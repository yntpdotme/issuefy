'use client';

import {register as signup} from '@/action/register';
import {CardWrapper} from '@/components/auth/CardWrapper';
import {PasswordInput} from '@/components/auth/PasswordInput';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import {FormItem} from '@/components/ui/FormItem';
import {FormMessage} from '@/components/ui/FormMessage';
import {Input} from '@/components/ui/Input';
import {RegisterSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@radix-ui/themes';
import {useEffect, useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    handleSubmit,
    register,
    setFocus,
    formState: {errors},
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await signup(data);
      setError(res.error);
      setSuccess(res.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account"
      backButtonHref="/auth/login"
      showSocial
    >
      <form
        className="mb-1 flex flex-col gap-6 px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormItem label="Name" id="name">
          <Input
            placeholder="John Doe"
            register={register('name')}
            disabled={isPending}
          />
          <FormMessage error={errors.name?.message} />
        </FormItem>

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

        <FormSuccess message={success} />

        <FormError message={error} />

        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 h-9 w-full cursor-pointer bg-black dark:bg-white dark:text-black"
        >
          Create an account
        </Button>
      </form>
    </CardWrapper>
  );
};
