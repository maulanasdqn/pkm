'use server';
import { db, informations } from '@pkm/libs/drizzle/tourism';
import { TInformationSchema } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getOneInformation = async (
  id: string
): Promise<{
  status: { [key: string]: boolean };
  data: TInformationSchema;
  message: string;
}> => {
  try {
    const data = await db
      .select({
        id: informations.id,
        title: informations.title,
        description: informations.description,
        location: informations.location,
        image: informations.image,
        createdAt: informations.createdAt,
        updatedAt: informations.updatedAt,
      })
      .from(informations)
      .where(eq(informations.id, id))
      .then((res) => res.at(0));

    if (!data) {
      throw new Error('informasi tidak ditemukan');
    }
    return {
      status: { ok: true },
      data: data,
      message: 'informasi ditemukan!',
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
