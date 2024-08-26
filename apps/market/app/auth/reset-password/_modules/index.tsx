import { FormAuth, TextField } from '@pkm/ui';
import { FC } from 'react';

export const ResetPasswordModule: FC = () => {
  return (
    <FormAuth
      buttonName="Simpan"
      title="Ubah Password"
      subtitle="Sekarang anda dapat mengubah password dengan yang baru."
    >
      <TextField name="password" type="password" placeholder="Buat password" />
      <TextField
        name="confirmPassword"
        type="password"
        placeholder="Ulangi password"
      />
    </FormAuth>
  );
};
