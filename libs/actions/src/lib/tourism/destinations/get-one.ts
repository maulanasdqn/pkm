'use server';
import { db } from '@pkm/libs/drizzle/tourism';
import { DatabaseError } from 'pg';

export const getOneDestination = async (id: string) => {
  try {
    const res = await db.query.destinations.findFirst({
      where: (destinations, { eq }) => eq(destinations.id, id),
    });
    return { message: 'found one destinations!', data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
