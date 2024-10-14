'use server';

import { cartItems, carts, db } from '@pkm/libs/drizzle/market';
import { InsertCartMarket } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const insertCart = async (payload: InsertCartMarket) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, payload.userId),
      with: {
        carts: true,
      },
    });

    const cartItem = await db
      .insert(cartItems)
      .values({
        cartId: user?.carts?.id,
        productId: payload.productId,
        quantity: Number(payload.quantity),
      })
      .returning();

    const product = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.id, payload.productId),
    });

    await db
      .update(carts)
      .set({
        totalPrice: cartItem?.reduce(
          (total, item) =>
            Number(total || 0) + item.quantity * Number(product?.price || 0),
          user?.carts?.totalPrice
        ),
      })
      .where(eq(carts.id, user?.carts?.id as string));

    return {
      status: { ok: true },
      message: 'Cart item inserted successfully',
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
