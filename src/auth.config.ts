import {getUserByEmail} from '@/data/user';
import {LoginSchema} from '@/schemas';
import bcryptjs from 'bcryptjs';
import type {NextAuthConfig} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const {success, data} = LoginSchema.safeParse(credentials);

        if (success) {
          const {email, password} = data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;