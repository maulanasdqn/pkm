// eslint-disable-next-line @nx/enforce-module-boundaries
import { TToken, TUser } from '@pkm/libs/entities';

declare module 'next-auth' {
  interface Session {
    user: Omit<TUser, 'password'>;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: Omit<TUser, 'password'>;
    token: TToken;
  }
}
