'use server';

import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getAllVisitors = async () => {
  try {
    const res = await db.query.visitors.findMany({
      orderBy(fields, operators) {
        return operators.desc(fields.date);
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
