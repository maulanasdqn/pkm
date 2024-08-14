import { FormAuth, TextField } from '@pkm/ui';
import Link from 'next/link';
import { FC } from 'react';

export const ForgotPasswordModule: FC = () => {
  return (
    <FormAuth
      buttonName="Kirim"
      title="Lupa Password?"
      subtitle="Jangan khawatir! Cukup masukkan email Anda, dan kami akan membantu Anda."
    >
      <div className="flex flex-col gap-2">
        <TextField name="email" placeholder="Masukan Email" />
        <Link href="/auth/forgot-password" className="text-xs text-neutral-60%">
          kirim ulang email?
        </Link>
      </div>
    </FormAuth>
  );
};
