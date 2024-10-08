import NextAuth from 'next-auth';
import { googleProvider } from './google';
import { credentialProvider } from './credential';
import { TUser } from '@pkm/libs/entities';
import { checkEmail, getUserData } from './util';
import { db, users } from '@pkm/libs/drizzle/market';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [googleProvider, credentialProvider],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const isUserExist = await checkEmail(user?.email);
        if (!isUserExist) {
          await db.insert(users).values({
            email: String(user?.email),
            roleId: 2,
            fullname: String(user?.name),
            image: String(user?.image),
            emailVerifiedAt: new Date(),
            address: '',
            password: '',
          });
          return `/auth/register?email=${user?.email}&fullname=${user?.name}&from=google`;
        }
        if (isUserExist) {
          const getUser = await getUserData(user?.email);
          const isEmailVerified = getUser?.emailVerifiedAt;
          if (!isEmailVerified) {
            return `/auth/register?email=${user?.email}&fullname=${user?.name}&from=google`;
          }
          return true;
        }
      }
      if (!user) return false;
      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === 'login') {
        const userData = user as TUser;
        token.user = {
          id: userData?.id,
          fullname: userData?.fullname,
          image: userData?.image,
          email: userData?.email,
          emailVerified: userData?.emailVerified,
          gender: userData?.gender,
          phoneNumber: userData?.phoneNumber,
          address: userData?.address,
          role: userData?.role,
          createdAt: userData?.createdAt,
          updatedAt: userData?.updatedAt,
        };
      }

      if (account?.provider === 'google') {
        const userData = await getUserData(user?.email);
        token.user = {
          id: userData?.id as string,
          fullname: userData?.fullname,
          image: userData?.image,
          email: String(userData?.email),
          emailVerifiedAt: userData?.emailVerifiedAt as Date,
          address: userData?.address,
          createdAt: userData?.createdAt,
          updatedAt: userData?.updatedAt,
        };
      }
      return token;
    },

    async session({ session, token }) {
      const user = token.user as TUser;

      session.user = user;
      return session;
    },
  },
});
