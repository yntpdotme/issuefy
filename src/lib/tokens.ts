import prisma from '@/prisma/client';
import {getPasswordResetTokenByEmail} from '@/server/db/passwordResetToken';
import ms from 'ms';
import {v4 as uuidv4} from 'uuid';

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + ms('1h'));

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken)
    await prisma.passwordResetToken.delete({where: {id: existingToken.id}});

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
