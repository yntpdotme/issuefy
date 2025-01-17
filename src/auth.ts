import authConfig from '@/auth.config';
import prisma from '@/prisma/client';
import {PrismaAdapter} from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

export const {handlers, auth, signIn, signOut} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  callbacks: {
    async session({token, session}) {
      if (token.sub && session.user) session.user.id = token.sub;

      return session;
    },
  },
  events: {
    async linkAccount({user}) {
      await prisma.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()},
      });
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  ...authConfig,
});
