'use server';

import { db, products } from '@pkm/libs/drizzle/market';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';
import { getOneProduct } from './get-one';
import { deleteImage } from '../../common';

export const deleteProduct = async (id: string) => {
  try {
    const product = await getOneProduct(id);

    if (!product) {
      return {
        message: 'product not found',
      };
    }

    if (product?.data?.image) {
      const fileName = product?.data?.image.split('/').pop();
      if (fileName) {
        await deleteImage(fileName, 'products');
      }
    }

    const res = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    revalidatePath('/dashboard/tour');
    return {
      message: `product ${res[0].name} deleted successfully!`,
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
