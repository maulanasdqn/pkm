'use server';

import { db, destinations } from '@pkm/libs/drizzle/tourism';
import {
  TDestinationSchema,
  TMetaResponse,
  TQueryParams,
} from '@pkm/libs/entities';
import { asc, ilike } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getAllDestinations = async (
  params?: TQueryParams
): Promise<{
  status: { [key: string]: boolean };
  data: TDestinationSchema[];
  meta?: TMetaResponse;
}> => {
  try {
    const page = params?.page || 1;
    const perPage = params?.perPage || 100;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: destinations.id,
        name: destinations.name,
        description: destinations.description,
        images: destinations.images,
        status: destinations.status,
        ticketPrice: destinations.ticketPrice,
        createdAt: destinations.createdAt,
        updatedAt: destinations.updatedAt,
      })
      .from(destinations)
      .where(ilike(destinations.name, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(destinations.createdAt));

    const count = await db
      .select({ id: destinations.id })
      .from(destinations)
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
