'use server';

import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getAllMessages = async () => {
  try {
    const res = await db.query.messages.findMany({
      where: (messages, { eq }) => eq(messages.isDeleted, false),
      orderBy: (fields, { desc }) => [desc(fields.createdAt)],
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
