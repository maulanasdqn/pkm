'use server';

import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';
import { db, destinations } from '@pkm/libs/drizzle/tourism';
import { revalidatePath } from 'next/cache';
import { getOneDestination } from './get-one';
import { deleteImage } from '../../common';

export const deleteDestination = async (id: string) => {
  try {
    const { data } = await getOneDestination(id);
    if (data) {
      data.images.map(async (image) => {
        const fileName = image.split('/').pop();
        if (fileName) {
          await deleteImage(fileName, 'destinations');
        }
      });
    }

    const res = await db
      .delete(destinations)
      .where(eq(destinations.id, id))
      .returning({ name: destinations.name });

    revalidatePath('/dashboard/tour');
    return {
      message: `destination ${res[0].name} deleted successfully!`,
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
