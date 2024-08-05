'use server';
import 'server-only';
import { eq } from 'drizzle-orm';
import { users } from '../../drizzle/market/schema';
import { dbMarket as db } from '../../drizzle/market/connection';
import { verifyPassword } from '../password';

export const checkEmail = async (email?: string | null) => {
  if (!email) return 'Email wajib diisi';
  try {
    const res = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res.length > 0);
    return res;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const checkPassword = async (password?: string, email?: string) => {
  if (!password) return;
  if (!email) return;
  try {
    const hashedPassword = await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res.at(0)?.password);

    if (hashedPassword) {
      const comparePassword = await verifyPassword(
        password,
        String(hashedPassword)
      );
      return comparePassword;
    }
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const getUserData = async (email?: string | null) => {
  if (!email) return;
  try {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res.at(0));
    return res;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
