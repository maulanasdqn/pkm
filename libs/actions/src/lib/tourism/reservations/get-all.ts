'use server';

import { db, destinations, reservations } from '@pkm/libs/drizzle/tourism';
import {
  TMetaResponse,
  TQueryParams,
  TReservationSchema,
} from '@pkm/libs/entities';
import { asc, eq, ilike } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getAllReservations = async (
  params?: TQueryParams
): Promise<{
  status: { [key: string]: boolean };
  data: TReservationSchema[];
  meta?: TMetaResponse;
}> => {
  try {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: reservations.id,
        name: reservations.name,
        email: reservations.email,
        phoneNumber: reservations.phoneNumber,
        date: reservations.date,
        time: reservations.time,
        quantity: reservations.quantity,
        status: reservations.status,
        destination: {
          id: destinations.id,
          name: destinations.name,
        },
      })
      .from(reservations)
      .where(ilike(reservations.name, `%${params?.search || ''}%`))
      .leftJoin(destinations, eq(destinations.id, reservations.destinationId))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(reservations.date));

    const count = await db
      .select({ id: reservations.id })
      .from(reservations)
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
