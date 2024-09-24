'use server';
import { DatabaseError } from 'pg';
import { revalidatePath } from 'next/cache';
import { db, informations } from '@pkm/libs/drizzle/tourism';
import { TCreateInformationSchema } from '@pkm/libs/entities';

export const createInformation = async ({
  title,
  description,
  image,
  location,
}: TCreateInformationSchema) => {
  try {
    const res = await db
      .insert(informations)
      .values({
        title,
        description,
        image,
        location,
      })
      .returning({
        id: informations.id,
        title: informations.title,
        description: informations.description,
        createdAt: informations.createdAt,
      });
    revalidatePath('/dashboard/information');

    return { message: 'Informasi berhasil ditambahkan', data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
