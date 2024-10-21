'use server';

import { db, products } from '@pkm/libs/drizzle/market';
import { TCreateProductMarket } from '@pkm/libs/entities';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const createProduct = async (data: TCreateProductMarket) => {
  try {
    const res = await db
      .insert(products)
      .values({
        ...data,
        price: Number(data.price),
        sold: 0,
        stock: Number(data.stock),
        image: data.image,
      })
      .returning();

    revalidatePath('/admin/produk');

    return {
      status: { ok: true },
      message: 'Produk berhasil ditambahkan',
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
