'use server';

import {
  cartItems,
  carts,
  db,
  orders,
  products,
} from '@pkm/libs/drizzle/market';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

type TCreateOrder = {
  cartId: string;
  image: string | null;
  notes: string | null;
  cartItemsIds: string[];
};

export const createOrder = async (payload: TCreateOrder) => {
  try {
    const cart = await db.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.id, payload.cartId),
      with: {
        cartItems: {
          with: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return { status: { ok: false }, message: 'Cart not found' };
    }

    const res = await db
      .insert(orders)
      .values({
        image: payload.image,
        totalPrice: cart.cartItems
          .filter((item) => payload.cartItemsIds.includes(item.id))
          .reduce(
            (total, item) =>
              Number(total || 0) + item.quantity * (item?.product?.price || 0),
            0
          ),

        userId: cart.userId,
        status: 'pending',
        notes: payload.notes,
      })
      .returning();

    cart.cartItems
      ?.filter((item) => payload.cartItemsIds.includes(item.id))
      .forEach(async (item) => {
        await db
          .update(cartItems)
          .set({
            orderId: res[0].id,
            isCompleted: true,
          })
          .where(eq(cartItems.id, item.id))
          .returning();

        await db
          .update(products)
          .set({ stock: (item?.product?.stock as number) - item?.quantity })
          .where(eq(products.id, item?.product?.id || ''))
          .returning();

        await db
          .update(carts)
          .set({
            totalPrice:
              (cart?.totalPrice as number) -
              item.quantity * (item?.product?.price || 0),
          })
          .where(eq(carts.id, payload.cartId));
      });

    revalidatePath('/carts');

    return {
      status: { ok: true },
      message: 'Order created successfully',
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
