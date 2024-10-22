'use server';

import { db, orders, products } from '@pkm/libs/drizzle/market';
import { OrderStatus } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  try {
    const order = await db.query.orders.findFirst({
      where: (orders, { eq }) => eq(orders.id, id),
      with: {
        cartItems: {
          with: {
            product: true,
          },
        },
      },
    });

    if (status === OrderStatus.APPROVED) {
      await db.update(orders).set({ status }).where(eq(orders.id, id));

      order?.cartItems?.forEach(async (item) => {
        await db
          .update(products)
          .set({
            sold: Number(item?.product?.sold ?? 0) + Number(item.quantity ?? 0),
          })
          .where(eq(products.id, item?.productId as string));
      });

      revalidatePath('/admin/order');

      return {
        status: { ok: true },
        message: 'Order approved successfully',
      };
    }

    if (status === OrderStatus.REJECTED) {
      await db.update(orders).set({ status }).where(eq(orders.id, id));

      order?.cartItems?.forEach(async (item) => {
        await db
          .update(products)
          .set({
            stock:
              Number(item?.product?.stock ?? 0) + Number(item.quantity ?? 0),
          })
          .where(eq(products.id, item?.productId as string));
      });

      revalidatePath('/admin/order');

      return {
        status: { ok: true },
        message: 'Order cancelled successfully',
      };
    }

    revalidatePath('/admin/order');

    return {
      status: { ok: false },
      message: 'Invalid order status',
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
