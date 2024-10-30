'use server';
import { generateToken } from '@pkm/libs/auth';
import { db, users } from '@pkm/libs/drizzle/market';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';

const { SMTP_EMAIL, SMTP_PASSWORD, APP_URL } = process.env;

type TTokenPayload = {
  id: string;
  email: string;
};
export const sendEmailMarket = async (path: string, paylaod: TTokenPayload) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const token = await generateToken(paylaod);

    const link = `${APP_URL}${path}?token=${token}`;

    await transport.sendMail({
      from: SMTP_EMAIL,
      to: paylaod.email,
      subject: 'Link Verifikasi Akun Pasar Desa Bojongsari',
      text: `Anda telah melakukan registrasi akun. Klik link dibawah ini untuk melakukan verifikasi akun. Hati-hati jangan berikan link ini ke siapapun,
      Berikut adalah link verifikasi akun anda: ${link}`,
    });

    return {
      status: { ok: true },
      message: 'Email berhasil dikirim',
    };
  } catch (error) {
    console.error(error);
  }
};

export const verifyEmail = async (id: string) => {
  try {
    const res = await db
      .update(users)
      .set({ emailVerifiedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    revalidatePath('/auth/verify');

    return {
      status: { ok: true },
      message: 'Email Berhasil Diverifikasi, Silahkan Login',
      data: res,
    };
  } catch (error) {
    revalidatePath('/auth/verify');
    console.error(error);
    return {
      status: { ok: false },
      message: 'Email Gagal Diverifikasi',
    };
  }
};
