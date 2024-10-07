'use server';
import { db, reservations } from '@pkm/libs/drizzle/tourism';
import { TUpdateReservationSchema } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const updateReservation = async ({
  id,
  name,
  email,
  phoneNumber,
  date,
  time,
  status,
  total,
  quantity,
  destinationId,
}: TUpdateReservationSchema) => {
  try {
    const res = await db
      .update(reservations)
      .set({
        name,
        email,
        phoneNumber,
        date,
        time,
        status,
        quantity,
        total,
        destinationId,
      })
      .where(eq(reservations.id, id))
      .returning({
        id: reservations.id,
        name: reservations.name,
        email: reservations.email,
      });

    revalidatePath('/dashboard/reservation');

    return {
      message: `reservation ${res[0].name} updated successfully!`,
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
