'use server';
import { DatabaseError } from 'pg';
import { revalidatePath } from 'next/cache';
import { db, reservations } from '@pkm/libs/drizzle/tourism';
import { TCreateReservationSchema } from '@pkm/libs/entities';

export const createReservation = async ({
  name,
  email,
  phoneNumber,
  date,
  time,
  status,
  total,
  quantity,
  destinationId,
}: TCreateReservationSchema) => {
  try {
    const res = await db
      .insert(reservations)
      .values({
        name,
        email,
        phoneNumber,
        date,
        time,
        status,
        total,
        quantity,
        destinationId,
      })
      .returning({
        id: reservations.id,
        name: reservations.name,
        email: reservations.email,
      });

    revalidatePath('/dashboard/reservation');

    return { message: 'Reservasi berhasil ditambahkan', data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
