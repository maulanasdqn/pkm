'use server';

import { db, reservations } from '@pkm/libs/drizzle/tourism';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

function countPastAndFutureSchedules(schedules: Date[]) {
  const today = new Date();

  let pastCount = 0;
  let futureCount = 0;

  schedules.forEach((schedule) => {
    if (schedule < today) {
      pastCount++;
    } else {
      futureCount++;
    }
  });

  return {
    pastCount,
    futureCount,
  };
}

export const getCardData = async () => {
  try {
    const dataConfirmed = await db
      .select({
        date: reservations.date,
      })
      .from(reservations)
      .where(eq(reservations.status, 'confirmed'));

    const confirmedSchedules: Date[] = [];

    dataConfirmed.forEach((item) => {
      confirmedSchedules.push(item.date);
    });

    const resDataConfirmed = countPastAndFutureSchedules(confirmedSchedules);

    const dataReScheduled = await db
      .select({
        date: reservations.date,
      })
      .from(reservations)
      .where(eq(reservations.status, 'reschedule'));

    const rescheduledSchedules: Date[] = [];

    dataReScheduled.forEach((item) => {
      rescheduledSchedules.push(item.date);
    });

    const resDataReScheduled =
      countPastAndFutureSchedules(rescheduledSchedules);

    const dataCanceled = await db
      .select({
        date: reservations.date,
      })
      .from(reservations)
      .where(eq(reservations.status, 'canceled'));

    const canceledSchedules: Date[] = [];

    dataCanceled.forEach((item) => {
      canceledSchedules.push(item.date);
    });

    const resDataCanceled = countPastAndFutureSchedules(canceledSchedules);
    return {
      confirmed: {
        upcomingCount: resDataConfirmed.futureCount,
        missedCount: resDataConfirmed.pastCount,
      },
      rescheduled: {
        upcomingCount: resDataReScheduled.futureCount,
        missedCount: resDataReScheduled.pastCount,
      },
      canceled: {
        upcomingCount: resDataCanceled.futureCount,
        missedCount: resDataCanceled.pastCount,
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
