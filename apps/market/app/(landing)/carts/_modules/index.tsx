'use client';
import { Button, CardCart, CheckBox, Textarea } from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const CartsModule: FC = (): ReactElement => {
  return (
    <section className="w-full h-full flex flex-col items-center gap-[10rem] px-20 py-28">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col gap-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardCart
              key={i}
              name={`item-${i + 1}`}
              amount={4}
              imageUrl="/images/kopi.webp"
              value={'1'}
              price={10_000}
            />
          ))}
        </div>

        <div className="w-full flex justify-between items-center px-20 text-2xl font-bold">
          <p>TOTAL PEMBELIAN</p>
          <p>Rp. 30.000</p>
        </div>
      </div>

      <div className="w-[80%] max-h-[624px] flex flex-col bg-neutral-10% shadow-md rounded-lg">
        <p className="py-5 w-full text-center text-xl border-b border-neutral">
          Informasi Pembelian
        </p>

        <form className="w-full flex flex-col items-center gap-6 pt-14 pb-8">
          <Textarea
            name="address"
            dimension="lg"
            placeholder="Masukkan Alamat"
            className="w-full min-w-[353px] min-h-[117px]"
          />

          <div className="flex gap-4">
            <CheckBox name="approve" shape="square" size="sm" />
            <p className="font-montserrat text-sm font-medium">
              Data yang saya masukkan sudah benar
            </p>
          </div>

          <Button size="md" color="red" className="text-lg font-normal ">
            Bayar Sekarang
          </Button>
        </form>
      </div>
    </section>
  );
};
