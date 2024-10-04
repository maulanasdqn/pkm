'use server';

import { db, users } from '@pkm/libs/drizzle/tourism';
import { eq } from 'drizzle-orm';
import { generateOTP } from './generate-otp';
import { sendEmail } from '../../common/send-email';

export const sendOtp = async (email: string) => {
  const user = await db
    .select({ id: users.id, otp: users.otp, otpExp: users.otpExp })
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res.at(0));

  if (!user) {
    throw new Error('User tidak ditemukan!');
  }

  const { data } = await generateOTP(user.id);

  await sendEmail(Number(data?.otp), email);
  return {
    message: `Otp Has Been sent to ${email} `,
  };
};
