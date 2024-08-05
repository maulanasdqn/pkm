import NextAuth from 'next-auth';
import { authProvider } from './provider';
import { checkEmail, getUserData } from './util';
import { dbMarket as db } from '../../drizzle';
import { users } from '../../drizzle/market/schema';

export const authMarket = NextAuth({
  providers: authProvider,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const isUserExist = await checkEmail(user?.email);
        if (!isUserExist) {
          await db.insert(users).values({
            fullname: user?.name as string,
            email: user?.email as string,
            avatar: user?.image as string,
            password: undefined,
            emailVerified: undefined,
          });
          return `/auth/register?email=${user?.email}&fullname=${user?.name}&from=google`;
        }
        if (isUserExist) {
          const getUser = await getUserData(user?.email);
          const isEmailVerified = getUser?.emailVerified;
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
          id: userData.id,
          fullname: userData.fullname,
          image: userData.image,
          email: userData.email,
          emailVerified: userData.emailVerified,
          address: userData.address,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
        };
      }
      if (account?.provider === 'google') {
        const userData = await getUserData(user?.email);
        token.user = {
          id: userData?.id as string,
          fullname: userData?.fullname,
          image: userData?.image,
          email: String(userData?.email),
          emailVerified: userData?.emailVerified as Date,
          address: userData?.address,
          createdAt: userData?.createdAt,
          updatedAt: userData?.updatedAt,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
