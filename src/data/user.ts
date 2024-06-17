import prisma from '@/prisma/client';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({where: {email}});

    return user;
  } catch (error) {
    return null;
  }
};
