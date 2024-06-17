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
  ...authConfig,
});
