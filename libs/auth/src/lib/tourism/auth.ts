import NextAuth from 'next-auth';
import { googleProvider } from './google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [googleProvider],
});
