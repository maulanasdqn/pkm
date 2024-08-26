// eslint-disable-next-line @nx/enforce-module-boundaries
import { TUser } from '@pkm/libs/entities';

declare module 'next-auth' {
  interface Session {
    user: Omit<TUser, 'password'>;
  }
}
