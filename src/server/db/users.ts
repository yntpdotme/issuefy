import prisma from '@/prisma/client';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({where: {email}});

    return user;
  } catch {
    return null;
  }
};

export const getUserNames = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {name: 'asc'},
    });

    return users;
  } catch {
    return null;
  }
};
