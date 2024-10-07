'use server';
import 'server-only';
import { db, users } from '@pkm/libs/drizzle/tourism';
import { eq } from 'drizzle-orm';

export const verifyOtp = async (email: string, otp: string) => {
  if (otp.length !== 6) {
    throw new Error('Otp tidak valid!');
  }

  const user = await db
    .select({ id: users.id, otp: users.otp, otpExp: users.otpExp })
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res.at(0));

  if (!user) {
    throw new Error('User tidak ditemukan!');
  }

  if (user.otp && user.otpExp) {
    if (user.otpExp < new Date()) {
      throw new Error('OTP Telah kadaluwarsa');
    }

    if (Number(user.otp) !== Number(otp)) {
      throw new Error('OTP Tidak Valid!');
    }
  }

  return {
    message: 'OTP verified successfully',
    data: await db
      .update(users)
      .set({ otp: null })
      .where(eq(users.id, user.id))
      .returning({ email: users.email })
      .then((res) => res.at(0)),
  };
};
