'use server';
import { db, visitors } from '@pkm/libs/drizzle/tourism';
import { and, gte, lte } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getThisWeekVisitor = async () => {
  try {
    const today = new Date();

    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const data = await db
      .select({
        date: visitors.date,
        desktop: visitors.desktop,
        mobile: visitors.mobile,
      })
      .from(visitors)
      .where(
        and(
          gte(visitors.date, firstDayOfWeek.toISOString().split('T')[0]),
          lte(visitors.date, today.toISOString().split('T')[0]),
        ),
      );
    console.log(data);
    let thisWeekVisitorCount: number = 0;
    data.forEach(({ desktop, mobile }) => {
      thisWeekVisitorCount += desktop + mobile;
    });
    return thisWeekVisitorCount;
  } catch (error) {
    console.error(error);
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
