'use server';

import { db } from '@pkm/libs/drizzle/tourism';
import { TDestinationSchema } from '@pkm/libs/entities';
import { DatabaseError } from 'pg';

export const getAllDestinations = async (): Promise<{
  message: string;
  data: TDestinationSchema[];
}> => {
  try {
    const res = await db.query.destinations.findMany();
    return { message: 'destinations found!', data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
