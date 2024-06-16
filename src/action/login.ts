'use server';

import {LoginSchema, RegisterSchema} from '@/schemas';
import {z} from 'zod';

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const {success} = LoginSchema.safeParse(data);

  if (!success) return { error: 'Invalid fields' };
  
  return {success: 'Success'}
};
