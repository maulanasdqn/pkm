'use client';
import { Button, ControlledTextarea, ControlledTextField } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export const FormContact: FC = (): ReactElement => {
  const { control } = useForm({
    mode: 'all',
  });

  return (
    <form className="flex flex-col gap-8 2xl:w-[70%] md:w-[80%]">
      <ControlledTextField
        name="name"
        control={control}
        placeholder="Nama"
        className="bg-neutral-10%"
      />
      <ControlledTextField
        name="email"
        control={control}
        placeholder="Email"
        className="bg-neutral-10%"
      />
      <ControlledTextarea
        name="message"
        control={control}
        placeholder="Pesan"
        rows={5}
        className="bg-neutral-10%"
      />

      <Button>Kirim</Button>
    </form>
  );
};
