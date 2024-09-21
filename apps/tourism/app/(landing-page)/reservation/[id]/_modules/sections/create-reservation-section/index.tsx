'use client';
import { FC, ReactElement, useState } from 'react';
import { Button, DatePicker, TextField } from '@pkm/ui';
import { cn } from '@pkm/libs/clsx';
import Image from 'next/image';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export const CreateReservationSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  const [qty, setQty] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>();
  return (
    <section
      className={cn(
        'container mx-auto lg:px-20 flex flex-col md:flex-row gap-7',
        className
      )}
    >
      <div className="rounded-lg w-full flex flex-col p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <Image
          src="/images/lake.png"
          alt="danau"
          width={250}
          height={250}
          className="max-h-[40dvh] aspect-auto w-full"
          priority
        />
        <div className="space-y-1 md:space-y-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl">Danau</h1>
          <h3 className="text-base md:text-lg lg:text-xl">Wisata Desa</h3>
        </div>
        <div className="border-t-2 space-y-3 pt-8 border-neutral-50%">
          <h3 className="text-base md:text-lg lg:text-xl">Harga Tiket</h3>
          <h4 className="text-xl md:text-2xl lg:text-3xl text-primary-60%">
            Rp. {qty * 10000}
          </h4>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col items-center justify-center p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <form className="space-y-5 w-full">
          <div className="flex gap-3 items-center">
            <span>Tanggal : </span>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="flex gap-3 items-center">
            <span>Pukul : </span>
            <TextField
              name="time"
              type="time"
              dimension="lg"
              placeholder="00"
            />
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
          <div className="flex justify-between">
            <div className="flex flex-col sm:flex-row gap-1 items-left sm:items-center">
              <p>Jumlah :</p>
              <div className="flex gap-1 items-center">
                <Button
                  type="button"
                  variant="text"
                  size="icon"
                  color="black"
                  className="text-sm"
                  onClick={() => {
                    setQty((prev) => prev - 1);
                  }}
                  disabled={qty === 0}
                >
                  <MinusOutlined />
                </Button>
                <div className="min-w-10 md:max-w-20">
                  <TextField
                    name="qty"
                    type="text"
                    dimension="lg"
                    placeholder="00"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                  />
                </div>
                <Button
                  type="button"
                  variant="text"
                  size="icon"
                  color="black"
                  className="text-sm"
                  onClick={() => {
                    setQty((prev) => prev + 1);
                  }}
                >
                  <PlusOutlined />
                </Button>
              </div>
            </div>
            <Button type="submit">Pesan Tiket</Button>
          </div>
        </form>
      </div>
    </section>
  );
};
