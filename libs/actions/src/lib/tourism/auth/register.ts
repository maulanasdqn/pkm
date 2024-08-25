'use server';
import 'server-only';
import { hashPassword } from '@pkm/libs/auth';
import { db, users } from '@pkm/libs/drizzle/tourism';
import { DatabaseError } from 'pg';

export const register = async (
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
      if (error.constraint === 'app_users_email_unique') {
        throw new Error('Email telah digunakan, silahkan gunakan email lain');
      }
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
