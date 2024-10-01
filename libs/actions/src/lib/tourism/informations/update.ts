'use server';
import { db, informations } from '@pkm/libs/drizzle/tourism';
import { TUpdateInformationSchema } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const updateInformation = async ({
  id,
  title,
  description,
  image,
  location,
}: TUpdateInformationSchema) => {
  try {
    const res = await db
      .update(informations)
      .set({
        title,
        description,
        image,
        location,
      })
      .where(eq(informations.id, id))
      .returning({
        id: informations.id,
        title: informations.title,
        description: informations.description,
        createdAt: informations.createdAt,
      });

    revalidatePath('/dashboard/information');

    return {
      message: `information ${res[0].title} updated successfully!`,
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
