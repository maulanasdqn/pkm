'use server';

import { db, users } from '@pkm/libs/drizzle/tourism';
import { hashPassword } from './password';
import { DatabaseError } from 'pg';

export const registerTourism = async (
  fullname: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hashPassword(password);
  try {
    const res = await db
      .insert(users)
      .values({ email, password: hashedPassword, address: '', fullname })
      .returning({
        id: users.id,
        email: users.email,
        fullname: users.fullname,
      });
    return res;
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
