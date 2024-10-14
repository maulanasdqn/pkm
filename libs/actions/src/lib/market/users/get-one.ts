'use server';

import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getOneUser = async (id: string) => {
  try {
    const res = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      with: { roles: true, carts: true },
    });
    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
