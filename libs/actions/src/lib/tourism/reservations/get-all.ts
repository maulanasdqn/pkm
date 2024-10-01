'use server';

import { db, destinations, reservations } from '@pkm/libs/drizzle/tourism';
import { TReservationSchema } from '@pkm/libs/entities';
import { asc, eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getAllReservations = async (): Promise<{
  status: { [key: string]: boolean };
  data: TReservationSchema[];
}> => {
  try {
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
      .leftJoin(destinations, eq(destinations.id, reservations.destinationId))
      .orderBy(asc(reservations.date));

    return {
      status: { ok: true },
      data: data,
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
