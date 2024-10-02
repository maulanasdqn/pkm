'use server';

import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getOneProduct = async (id: string) => {
  try {
    const res = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.id, id),
      with: {
        category: true,
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
