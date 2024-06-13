import authConfig from '@/auth.config';
import NextAuth from 'next-auth';

export const {handlers, auth, signIn, signOut} = NextAuth({
  session: {strategy: 'jwt'},
  ...authConfig,
});
