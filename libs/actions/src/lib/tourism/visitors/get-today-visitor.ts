'use server';
import { db, visitors } from '@pkm/libs/drizzle/tourism';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const getTodayVisitor = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await db
      .select({ desktop: visitors.desktop, mobile: visitors.mobile })
      .from(visitors)
      .where(eq(visitors.date, today.toISOString().split('T')[0]));

    const todayVisitorCount = data[0].desktop + data[0].mobile;
    return todayVisitorCount;
  } catch (error) {
    console.error(error);
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
