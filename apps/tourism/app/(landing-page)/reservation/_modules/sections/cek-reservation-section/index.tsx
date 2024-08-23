import { FC, ReactElement } from 'react';
import { Button, TextField } from '@pkm/ui';
import { cn } from '@pkm/libs/clsx';

export const CekReservationSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section className={cn('container mx-auto px-40', className)}>
      <div className="rounded-lg w-full flex flex-col p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <h1 className="text-2xl font-semibold">Form Cek Reservasi</h1>
        <form className="space-y-5">
          <TextField
            name="name"
            type="text"
            dimension="lg"
            placeholder="Masukkan Nama"
          />
          <TextField
            name="email"
            type="email"
            dimension="lg"
            placeholder="Masukkan Email"
          />
          <TextField
            name="phone"
            type="text"
            dimension="lg"
            placeholder="Nomor Telepon"
          />
          <Button type="submit" size="lg">
            Cek Reservasi
          </Button>
        </form>
      </div>
    </section>
  );
};
