'use server';
import { db, users } from '@pkm/libs/drizzle/market';
import { TProfileMarket } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const updateUser = async (id: string, payload: TProfileMarket) => {
  try {
    const user = db
      .update(users)
      .set({
        ...payload,
      })
      .where(eq(users.id, id))
      .returning();

    revalidatePath('/profile');

    return {
      status: { ok: true },
      message: 'Profile updated successfully',
      data: user,
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
