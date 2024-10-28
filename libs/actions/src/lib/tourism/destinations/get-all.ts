'use server';

import { db, destinations, visitors } from '@pkm/libs/drizzle/tourism';
import {
  TDestinationSchema,
  TMetaResponse,
  TQueryParams,
} from '@pkm/libs/entities';
import { asc, eq, ilike } from 'drizzle-orm';
import { DatabaseError } from 'pg';
import { isMobile } from 'react-device-detect';

export const getAllDestinations = async (
  params?: TQueryParams,
): Promise<{
  status: { [key: string]: boolean };
  data: TDestinationSchema[];
  meta?: TMetaResponse;
}> => {
  try {
    const page = params?.page || 1;
    const perPage = params?.perPage || 100;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: destinations.id,
        name: destinations.name,
        description: destinations.description,
        images: destinations.images,
        status: destinations.status,
        ticketPrice: destinations.ticketPrice,
        createdAt: destinations.createdAt,
        updatedAt: destinations.updatedAt,
      })
      .from(destinations)
      .where(ilike(destinations.name, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(destinations.createdAt));

    const count = await db
      .select({ id: destinations.id })
      .from(destinations)
      .then((res) => res.length);

    const totalPage = Math.ceil(count / perPage);
    const nextPage = page < totalPage ? Number(page) + 1 : null;
    const prevPage = page > 1 ? Number(page - 1) : null;

    const todayVisitor = await db
      .select({
        id: visitors.id,
        date: visitors.date,
        desktop: visitors.desktop,
        mobile: visitors.mobile,
      })
      .from(visitors)
      .where(eq(visitors.date, new Date().toISOString().split('T')[0]));

    if (!todayVisitor) {
      const newData = {
        date: new Date().toISOString().split('T')[0],
        desktop: 0,
        mobile: 0,
      };
      if (isMobile) {
        await db
          .insert(visitors)
          .values([{ ...newData, desktop: 0, mobile: 1 }]);
      } else {
        await db
          .insert(visitors)
          .values([{ ...newData, desktop: 1, mobile: 0 }]);
      }
    } else {
      if (isMobile) {
        const res = await db
          .update(visitors)
          .set({
            date: todayVisitor[0].date,
            desktop: todayVisitor[0].desktop,
            mobile: todayVisitor[0].mobile + 1,
          })
          .where(eq(visitors.id, todayVisitor[0].id))
          .returning({
            mobile: visitors.mobile,
          });
        console.log('visitor mobile updated!' + res);
      } else {
        const res = await db
          .update(visitors)
          .set({
            date: todayVisitor[0].date,
            desktop: todayVisitor[0].desktop + 1,
            mobile: todayVisitor[0].mobile,
          })
          .where(eq(visitors.id, todayVisitor[0].id))
          .returning({ desktop: visitors.desktop });
        console.log(res);
      }
    }
    return {
      status: { ok: true },
      data: data,
      meta: {
        page,
        nextPage,
        prevPage,
        perPage,
        totalPage,
      },
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
