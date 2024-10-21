'use server';

import { db, OrdersWithUserItems } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getAllOrders = async () => {
  try {
    const res = (await db.query.orders.findMany({
      with: {
        cartItems: {
          with: {
            product: true,
          },
        },
        user: true,
      },
    })) as OrdersWithUserItems[];

    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
