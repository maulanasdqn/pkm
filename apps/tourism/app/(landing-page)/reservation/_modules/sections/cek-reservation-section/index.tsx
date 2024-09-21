import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { Button, TextField } from '@pkm/ui';
import { cn } from '@pkm/libs/clsx';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const CekReservationSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section className={cn('container mx-auto space-y-8 lg:px-40', className)}>
      <div className="flex p-5 gap-3 rounded-lg border border-neutral-60% bg-white shadow-md">
        <ExclamationCircleOutlined className="text-xl shrink-0" />
        <div className="flex flex-col text-sm md:text-base">
          <span>Pastikan anda telah memesan reservasi terlebih dahulu!</span>
          <span>
            jika anda belum memesan reservasi, silahkan{' '}
            <Link
              href="/tours"
              className="underline hover:text-primary transition-colors duration-200"
            >
              klik disini
            </Link>{' '}
            untuk menuju ke halaman destinasi.
          </span>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <h1 className="text-xl md:text-2xl font-semibold">
          Form Cek Reservasi
        </h1>
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
