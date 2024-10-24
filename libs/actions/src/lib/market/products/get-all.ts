'use server';

import { db } from '@pkm/libs/drizzle/market';
import { DatabaseError } from 'pg';

export const getAllProducts = async (limit?: number, search?: string) => {
  try {
    const res = await db.query.products.findMany({
      with: {
        category: true,
      },
      limit,
      orderBy(fields, operators) {
        return operators.desc(fields.createdAt);
      },
      where: search
        ? (products, { ilike }) =>
            ilike(products.name, `%${search.toLowerCase()}%`)
        : undefined,
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

export const getProductsByCategory = async (id: string, search?: string) => {
  try {
    const res = await db.query.category.findFirst({
      where: (category, { eq }) => eq(category.id, id),
      with: {
        products: {
          with: {
            category: true,
          },
          orderBy(fields, operators) {
            return operators.desc(fields.createdAt);
          },
          where: search
            ? (products, { ilike }) =>
                ilike(products.name, `%${search.toLowerCase()}%`)
            : undefined,
        },
      },
    });
    return { status: { ok: true }, data: res };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      return { status: { ok: false }, message: error.message };
    }
    throw new Error(error as string);
  }
};
