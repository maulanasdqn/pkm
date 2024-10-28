'use server';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { db, visitors } from '@pkm/libs/drizzle/tourism';
import { and, gte, lte } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getThisMonthVisitor = async () => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const data = await db
      .select({
        date: visitors.date,
        desktop: visitors.desktop,
        mobile: visitors.mobile,
      })
      .from(visitors)
      .where(
        and(
          gte(visitors.date, firstDayOfMonth.toISOString().split('T')[0]),
          lte(visitors.date, today.toISOString().split('T')[0]),
        ),
      );
    const thisMonthVisitor = data.reduce(
      (totals, visitor) => {
        totals.desktop += visitor.desktop;
        totals.mobile += visitor.mobile;
        return {
          month: format(new Date(visitor.date), 'MMMM', { locale: id }),
          mobile: totals.mobile,
          desktop: totals.desktop,
        };
      },
      { month: '', mobile: 0, desktop: 0 },
    );
    return thisMonthVisitor;
  } catch (error) {
    console.error(error);
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
