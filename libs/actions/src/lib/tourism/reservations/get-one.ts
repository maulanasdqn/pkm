'use server';
import { db, destinations, reservations } from '@pkm/libs/drizzle/tourism';
import { TReservationSchema } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getOneReservation = async (
  id: string
): Promise<{
  status: { [key: string]: boolean };
  data: TReservationSchema;
  message: string;
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
        status: reservations.status,
        quantity: reservations.quantity,
        destination: {
          id: destinations.id,
          name: destinations.name,
        },
      })
      .from(reservations)
      .leftJoin(destinations, eq(destinations.id, reservations.destinationId))
      .where(eq(reservations.id, id))
      .then((res) => res.at(0));

    if (!data) {
      throw new Error('reservasi tidak ditemukan');
    }
    return {
      status: { ok: true },
      data: data,
      message: 'reservasi ditemukan!',
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
