'use server';
import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getOneCart = async (id: string) => {
  try {
    const res = await db.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.userId, id),
      with: {
        cartItems: {
          with: {
            product: true,
          },
        },
      },
    });

    if (!res) {
      return { status: { ok: false }, message: 'Cart not found' };
    }

    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
