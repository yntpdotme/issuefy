'use server';

import {getUserByEmail} from '@/data/user';
import {sendPasswordResetEmail} from '@/lib/mail';
import {generatePasswordResetToken} from '@/lib/tokens';
import {ResetPasswordSchema} from '@/schemas';
import {z} from 'zod';

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
