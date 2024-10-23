'use server';

import { db, OrdersWithUserItems } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getOneOrders = async (id: string) => {
  try {
    const res = (await db.query.orders.findFirst({
      where: (orders, { eq }) => eq(orders.id, String(id)),
      with: {
        cartItems: {
          with: {
            product: true,
          },
        },
        user: true,
      },
    })) as OrdersWithUserItems;

    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      return { status: { ok: false }, message: error.message };
    }

    throw new Error(error as string);
  }
};
