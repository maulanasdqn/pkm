'use server';

import { db, visitors } from '@pkm/libs/drizzle/tourism';
import { and, gte, lte } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getPeakVisitor = async () => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );

    const data = await db
      .select({
        date: visitors.date,
        mobile: visitors.mobile,
        desktop: visitors.desktop,
      })
      .from(visitors)
      .where(
        and(
          gte(visitors.date, firstDayOfMonth.toISOString().split('T')[0]),
          lte(visitors.date, lastDayOfMonth.toISOString().split('T')[0]),
        ),
      );

    const peakVisitor = data.reduce(
      (peak, visitor) => {
        const totalVisitors = visitor.desktop + visitor.mobile;
        if (totalVisitors > peak.totalVisitors) {
          return { date: visitor.date, totalVisitors };
        }
        return peak;
      },
      { date: '', totalVisitors: 0 },
    );
    console.log(peakVisitor);
    return peakVisitor;
  } catch (error) {
    console.error(error);
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
