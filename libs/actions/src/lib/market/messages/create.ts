'use server';

import { db, messages } from '@pkm/libs/drizzle/market';
import { TCreateMessage } from '@pkm/libs/entities';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const createMessage = async (payload: TCreateMessage) => {
  try {
    const res = await db
      .insert(messages)
      .values({
        sender: payload.sender,
        message: payload.message,
        email: payload.email,
      })
      .returning();

    revalidatePath('/admin/messages');

    return {
      status: { ok: true },
      message: 'Message sent successfully',
      data: res,
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
