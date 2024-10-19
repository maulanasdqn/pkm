'use server';

import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';
import { db, informations } from '@pkm/libs/drizzle/tourism';
import { revalidatePath } from 'next/cache';
import { getOneInformation } from './get-one';
import { deleteImageUT } from '../../common';

export const deleteInformation = async (id: string) => {
  try {
    const { data } = await getOneInformation(id);
    if (data) {
      await deleteImageUT(data.image);
    }

    const res = await db
      .delete(informations)
      .where(eq(informations.id, id))
      .returning({ title: informations.title });

    revalidatePath('/dashboard/information');
    return {
      message: `information ${res[0].title} deleted successfully!`,
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
