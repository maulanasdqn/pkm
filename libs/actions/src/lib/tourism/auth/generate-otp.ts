'use server';
import 'server-only';
import { db, users } from '@pkm/libs/drizzle/tourism';
import { eq } from 'drizzle-orm';

export const generateOTP = async (user_id: string) => {
  if (!user_id) {
    throw new Error('User ID is required');
  }

  const existOtp = await db
    .select({
      otp: users.otp,
    })
    .from(users)
    .where(eq(users.id, user_id));

  if (existOtp) {
    await db.update(users).set({ otp: null }).where(eq(users.id, user_id));
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const exp: Date = new Date(Date.now() + 5 * 60 * 1000);

  return {
    data: await db
      .update(users)
      .set({
        otp: otp.toString(),
        otpExp: exp,
      })
      .where(eq(users.id, user_id))
      .returning({ otp: users.otp })
      .then((res) => res.at(0)),
  };
};
