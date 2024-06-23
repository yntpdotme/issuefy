'use client';

import {CardWrapper} from '@/components/auth/CardWrapper';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import {FormItem} from '@/components/ui/FormItem';
import {FormMessage} from '@/components/ui/FormMessage';
import {Input} from '@/components/ui/Input';
import {ResetPasswordSchema} from '@/schemas';
import {resetPassword} from '@/server/actions/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@radix-ui/themes';
import {useEffect, useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    handleSubmit,
    register,
    setFocus,
    formState: {errors},
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await resetPassword(values);
      setError(res?.error);
      setSuccess(res?.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
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

        <FormSuccess message={success} />

        <FormError message={error} />

        <Button
          type="submit"
          disabled={isPending}
          className="mb-6 h-9 w-full cursor-pointer bg-black dark:bg-white dark:text-black"
        >
          Send reset email
        </Button>
      </form>
    </CardWrapper>
  );
};
