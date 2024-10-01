'use server';

import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getAllProducts = async () => {
  try {
    const res = await db.query.products.findMany({
      with: {
        category: true,
      },
      orderBy(fields, operators) {
        return operators.desc(fields.createdAt);
      },
    });
    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};

export const getAllCategoriesProduct = async () => {
  try {
    const res = await db.query.category.findMany();

    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
