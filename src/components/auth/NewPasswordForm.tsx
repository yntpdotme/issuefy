'use client';

import {newPassword} from '@/action/newPassword';
import {CardWrapper} from '@/components/auth/CardWrapper';
import {PasswordInput} from '@/components/auth/PasswordInput';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import {FormItem} from '@/components/ui/FormItem';
import {FormMessage} from '@/components/ui/FormMessage';
import {NewPasswordSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@radix-ui/themes';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    handleSubmit,
    register,
    setFocus,
    formState: {errors},
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  const onSubmit = (value: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await newPassword(value, token);
      setError(res?.error);
      setSuccess(res?.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form
        className="mb-1 flex flex-col gap-6 px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormItem label="Password" id="password">
          <PasswordInput register={register('password')} disabled={isPending} />
          <FormMessage error={errors.password?.message} />
        </FormItem>

        <FormSuccess message={success} />

        <FormError message={error} />

        <Button
          type="submit"
          disabled={isPending}
          className="mb-6 h-9 w-full cursor-pointer bg-black dark:bg-white dark:text-black"
        >
          Reset password
        </Button>
      </form>
    </CardWrapper>
  );
};
