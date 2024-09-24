'use server';
import { db, informations } from '@pkm/libs/drizzle/tourism';
import { TInformationSchema } from '@pkm/libs/entities';
import { sql } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getTwoInformation = async (
  id: string
): Promise<{
  status: { [key: string]: boolean };
  data: TInformationSchema[];
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
      .limit(2)
      .where(sql`${informations.id} != ${id}`);

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
