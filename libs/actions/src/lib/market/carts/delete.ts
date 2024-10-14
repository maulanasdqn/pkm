'use server';
import { cartItems, carts, db } from '@pkm/libs/drizzle/market';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const deleteCartItems = async (
  id: string,
  userId: string,
  productId: string
) => {
  try {
    const res = await db
      .delete(cartItems)
      .where(eq(cartItems.id, id))
      .returning();

    const product = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.id, productId),
    });

    const cart = await db.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.userId, userId),
    });

    await db
      .update(carts)
      .set({
        totalPrice:
          Number(cart?.totalPrice || 0) -
          Number(product?.price || 0) * Number(res?.[0]?.quantity),
      })
      .where(eq(carts.userId, userId))
      .returning();

    revalidatePath('/carts');

    return {
      status: { ok: true },
      message: 'Cart item deleted successfully',
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
