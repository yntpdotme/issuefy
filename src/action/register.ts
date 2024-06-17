'use server';

import {getUserByEmail} from '@/data/user';
import prisma from '@/prisma/client';
import {RegisterSchema} from '@/schemas';
import bcryptjs from 'bcryptjs';
import {z} from 'zod';

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
