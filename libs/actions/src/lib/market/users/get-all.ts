'use server';

import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getAllUsers = async () => {
  try {
    const res = await db.query.users.findMany({
      orderBy(fields, operators) {
        return operators.desc(fields.createdAt);
      },
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
