'use server';
import { db, destinations } from '@pkm/libs/drizzle/tourism';
import { TCreateDestinationSchema } from '@pkm/libs/entities';
import { DatabaseError } from 'pg';

export const createDestination = async ({
  name,
  description,
  images,
  status,
  ticketPrice,
}: TCreateDestinationSchema) => {
  try {
    const res = await db
      .insert(destinations)
      .values({
        name,
        description,
        images,
        status,
        ticketPrice,
      })
      .returning({
        id: destinations.id,
        name: destinations.name,
        description: destinations.description,
        createdAt: destinations.createdAt,
      });
    return { message: 'Destinasi berhasil ditambahkan', data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
