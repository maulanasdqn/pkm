'use server';
import nodemailer from 'nodemailer';

export async function sendEmail(otp_code: number, identifier: string) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    await transport.sendMail({
      from: `Desa Wisata Bojongsari <${SMTP_EMAIL}>`,
      to: identifier,
      subject: 'Kode Verifikasi OTP',
      text: `Kode Verifikasi OTP anda ${otp_code}!`,
      html: `Anda telah melakukan permintaan untuk reset password, masukan kode otp dibawah ini untuk melanjutkan, Hati-hati jangan berikan kode otp ini ke siapapun jika anda tidak merasa meminta reset kata sandi,
      <strong>Berikut adalah kode otp anda</strong> <strong>${otp_code}</strong>`,
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send email');
  }
}
