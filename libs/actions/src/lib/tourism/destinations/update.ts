'use server';
import { db, destinations } from '@pkm/libs/drizzle/tourism';
import { TUpdateDestinationSchema } from '@pkm/libs/entities';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { DatabaseError } from 'pg';

export const updateDestination = async ({
  id,
  name,
  description,
  images,
  status,
  ticketPrice,
}: TUpdateDestinationSchema) => {
  try {
    const res = await db
      .update(destinations)
      .set({
        name,
        description,
        images,
        status,
        ticketPrice,
      })
      .where(eq(destinations.id, id))
      .returning({
        id: destinations.id,
        name: destinations.name,
        description: destinations.description,
        createdAt: destinations.createdAt,
      });

    revalidatePath('/dashboard/tour');

    return {
      message: `destination ${res[0].name} updated successfully!`,
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
