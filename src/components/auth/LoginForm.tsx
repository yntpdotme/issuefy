'use client';

import {CardWrapper} from '@/components/auth/CardWrapper';
import {FormMessage} from '@/components/ui/FormMessage';
import {PasswordInput} from '@/components/auth/PasswordInput';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import {FormItem} from '@/components/ui/FormItem';
import {Input} from '@/components/ui/Input';
import {LoginSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@radix-ui/themes';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
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
          />
          <FormMessage error={errors.email?.message} />
        </FormItem>

        <FormItem label="Password" id="password">
          <PasswordInput register={register('password')} />
          <FormMessage error={errors.password?.message} />
        </FormItem>

        <FormSuccess message="" />

        <FormError message="" />

        <Button
          type="submit"
          className="mt-2 h-9 w-full cursor-pointer bg-black dark:bg-white dark:text-black"
        >
          Login
        </Button>
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
