'use server';

import {RegisterSchema} from '@/schemas';
import {z} from 'zod';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const {success} = RegisterSchema.safeParse(data);

  if (!success) return {error: 'Invalid fields'};

  return {success: 'Account created'};
};
