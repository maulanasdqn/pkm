import { FormAuth, FormAuthFooter, TextField } from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const RegisterModule: FC = (): ReactElement => {
  return (
    <FormAuth
      title="Daftar Akun"
      buttonName="Daftar"
      footer={
        <FormAuthFooter
          title="Sudah punya akun"
          link="/auth/login"
          linkName="Login"
        />
      }
    >
      <fieldset className="w-full flex flex-col gap-8 font-montserrat">
        <TextField name="fullname" placeholder="Nama Lengkap" />
        <TextField name="email" placeholder="Email" />
        <TextField
          name="password"
          type="password"
          placeholder="Buat password"
        />
        <TextField
          name="confirmPassword"
          type="password"
          placeholder="Ulangi password"
        />
      </fieldset>
    </FormAuth>
  );
};
