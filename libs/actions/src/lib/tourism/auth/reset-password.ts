'use server';
import { hashPassword } from '@pkm/libs/auth';
import { db, users } from '@pkm/libs/drizzle/tourism';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export const resetPassword = async (email: string, newPassword: string) => {
  const hashedPassword = await hashPassword(newPassword);
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
      redirect('/auth/login');
    }
  }

  await db
    .update(users)
    .set({ password: hashedPassword, otp: null, otpExp: null })
    .where(eq(users.email, email));
  return { message: 'Katasandi telah diubah, silahkan login kembali' };
};
