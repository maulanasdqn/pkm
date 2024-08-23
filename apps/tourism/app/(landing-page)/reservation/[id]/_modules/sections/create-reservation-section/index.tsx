import { FC, ReactElement } from 'react';
import { Button, DatePicker, TextField } from '@pkm/ui';
import { cn } from '@pkm/libs/clsx';
import Image from 'next/image';

export const CreateReservationSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section className={cn('container mx-auto px-40 flex gap-10', className)}>
      <div className="rounded-lg w-full flex flex-col p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <Image
          src="/images/lake.png"
          alt="danau"
          width={350}
          height={200}
          className="aspect-auto w-full"
        />
        <div className="space-y-3">
          <h1 className="text-3xl">Danau</h1>
          <h3 className="text-xl">Wisata Desa</h3>
        </div>
        <div className="border-t-2 space-y-3 pt-8">
          <h3 className="text-xl">Harga Tiket</h3>
          <h4 className="text-xl text-primary-60%">Rp. 10.000</h4>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col items-center justify-center p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <form className="space-y-5 w-full">
          <DatePicker/>
          <div className="flex gap-3 items-center">
            <span>Pukul : </span>
            <div className="max-w-12">
              <TextField
                name="hour"
                type="text"
                dimension="lg"
                placeholder="00"
              />
            </div>
            <span> : </span>
            <div className="max-w-12">
              <TextField
                name="minute"
                type="text"
                dimension="lg"
                placeholder="00"
              />
            </div>
          </div>
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
            Pesan Tiket
          </Button>
        </form>
      </div>
    </section>
  );
};
