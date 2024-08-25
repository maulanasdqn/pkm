import { TUser, TToken } from '@pkm/libs/entities';

declare module 'next-auth/jwt' {
  interface JWT {
    user: Omit<TUser, 'password'>;
    token: TToken;
  }
}

declare module 'next-auth' {
  interface Session {
    user: Omit<TUser, 'password'>;
  }
}
