import { FormAuth, FormAuthFooter, TextField } from '@pkm/ui';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

export const LoginModule: FC = (): ReactElement => {
  return (
    <FormAuth
      title="Masuk Akun"
      buttonName="Masuk"
      footer={
        <FormAuthFooter
          title="Belum punya akun"
          link="/auth/register"
          linkName="Daftar"
        />
      }
    >
      <fieldset className="w-full flex flex-col gap-8 font-montserrat">
        <TextField name="email" placeholder="Email" />
        <div className="flex flex-col gap-2">
          <TextField name="password" type="password" placeholder="Password" />
          <Link
            href="/auth/forgot-password"
            className="text-xs text-neutral-60%"
          >
            Lupa password?
          </Link>
        </div>
      </fieldset>
    </FormAuth>
  );
};
