'use server';

import { db, products } from '@pkm/libs/drizzle/market';
import { TCreateProductMarket } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const updateProduct = async (id: string, data: TCreateProductMarket) => {
  try {
    const res = await db
      .update(products)
      .set({
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        image: data.image,
      })
      .where(eq(products.id, id))
      .returning();

    revalidatePath('/admin/produk');

    return {
      status: { ok: true },
      message: 'Produk berhasil diupdate',
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
