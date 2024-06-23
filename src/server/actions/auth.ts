'use server';

import {signIn} from '@/auth';
import {sendPasswordResetEmail} from '@/lib/mail';
import {generatePasswordResetToken} from '@/lib/tokens';
import prisma from '@/prisma/client';
import {DEFAULT_LOGIN_REDIRECT} from '@/routes';
import {
  LoginSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from '@/schemas';
import {getUserByEmail} from '@/server/db/users';
import bcryptjs from 'bcryptjs';
import {AuthError} from 'next-auth';
import {z} from 'zod';
import {getPasswordResetTokenByToken} from '../db/passwordResetToken';

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

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const {success, data} = RegisterSchema.safeParse(values);

  if (!success) return {error: 'Invalid fields'};

  const {email, password, name} = data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return {error: 'Email already in use!'};

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {success: 'Account created'};
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const {success, data} = ResetPasswordSchema.safeParse(values);

  if (!success) return {error: 'Invalid email!'};

  const existingUser = await getUserByEmail(data.email);
  if (!existingUser) return {error: 'Email not found'};

  if (existingUser.email === process.env.GUEST_EMAIL) {
    return {error: `Password reset isn't allowed for Guest Users.`};
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email,
  );

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {success: 'Reset email sent!'};
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) return {error: 'Missing token!'};

  const {success, data} = NewPasswordSchema.safeParse(values);
  if (!success) return {error: 'Invalid fields!'};

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return {error: 'Invalid token!'};
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return {error: 'Token hs expired'};

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return {error: 'Email does not exist!'};

  const hashedPassword = await bcryptjs.hash(data.password, 10);

  await prisma.user.update({
    where: {id: existingUser.id},
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({where: {id: existingToken.id}});

  return {success: 'Password update!'};
};

export const guestLogin = async (callbackUrl?: string | null) => {
  const GUEST_PASSWORD = process.env.GUEST_PASSWORD!;
  const GUEST_EMAIL = process.env.GUEST_EMAIL!;

  try {
    const existingUser = await getUserByEmail(GUEST_EMAIL);
    if (!existingUser) {
      return {
        error: 'Guest account not configured.',
      };
    }

    const redirect = await signIn('credentials', {
      email: GUEST_EMAIL,
      password: GUEST_PASSWORD,
      redirect: false,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return {success: 'Logged in as guest successfully!', redirect};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {error: 'Invalid guest credentials!'};
        default:
          return {error: 'Something went wrong!'};
      }
    }

    throw error;
  }
};
