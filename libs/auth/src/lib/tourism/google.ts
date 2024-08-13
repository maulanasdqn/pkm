import { configEnv } from '@pkm/libs/env';
import GoogleProvider from 'next-auth/providers/google';

export const googleProvider = () =>
  GoogleProvider({
    clientId: configEnv.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: configEnv.AUTH_GOOGLE_CLIENT_SECRET,
  });
