'use server';

import {getPasswordResetTokenByToken} from '@/data/passwordResetToken';
import {getUserByEmail} from '@/data/user';
import prisma from '@/prisma/client';
import {NewPasswordSchema} from '@/schemas';
import bcryptjs from 'bcryptjs';
import {z} from 'zod';

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

  const hashedPassword = await bcryptjs.hash(values.password, 10);

  await prisma.user.update({
    where: {id: existingUser.id},
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({where: {id: existingToken.id}});

  return {success: 'Password update!'};
};
