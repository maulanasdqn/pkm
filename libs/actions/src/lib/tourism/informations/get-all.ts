'use server';

import { db, informations } from '@pkm/libs/drizzle/tourism';
import {
  TInformationSchema,
  TMetaResponse,
  TQueryParams,
} from '@pkm/libs/entities';
import { asc, ilike } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getAllInformations = async (
  params?: TQueryParams
): Promise<{
  status: { [key: string]: boolean };
  data: TInformationSchema[];
  meta?: TMetaResponse;
}> => {
  try {
    const page = params?.page || 1;
    const perPage = params?.perPage || 20;
    const offset = (page - 1) * perPage;

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
      .where(ilike(informations.title, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(informations.createdAt));

    const count = await db
      .select({ id: informations.id })
      .from(informations)
      .then((res) => res.length);

    const totalPage = Math.ceil(count / perPage);
    const nextPage = page < totalPage ? Number(page) + 1 : null;
    const prevPage = page > 1 ? Number(page - 1) : null;

    return {
      status: { ok: true },
      data: data,
      meta: {
        page,
        nextPage,
        prevPage,
        perPage,
        totalPage,
      },
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
