'use server';

import { db, messages } from '@pkm/libs/drizzle/market';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const deleteMessages = async (id: string) => {
  try {
    const res = await db
      .update(messages)
      .set({ isDeleted: true })
      .where(eq(messages.id, id))
      .returning();

    revalidatePath('/admin/messages');

    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
