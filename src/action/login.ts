'use server';

import {signIn} from '@/auth';
import {getUserByEmail} from '@/data/user';
import {DEFAULT_LOGIN_REDIRECT} from '@/routes';
import {LoginSchema} from '@/schemas';
import {AuthError} from 'next-auth';
import {z} from 'zod';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const {success, data} = LoginSchema.safeParse(values);

  if (!success) return {error: 'Invalid fields'};

  const existingUser = await getUserByEmail(data.email);
  if (!existingUser) return {error: 'User does not exist!'};
  if (!existingUser.password)
    return {
      error: 'This account was created using social login!',
    };

  try {
    const {email, password} = data;

    const redirect = await signIn('credentials', {
      email,
      password,
      redirect: false,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return {success: 'Success', redirect};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {error: 'Invalid credentials!'};
        default:
          return {error: 'Something went wrong!'};
      }
    }

    throw error;
  }
};
