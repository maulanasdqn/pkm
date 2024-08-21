import { CardMarket, TextField } from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const ProductsModule: FC = (): ReactElement => {
  return (
    <section className="w-full h-full flex items-center flex-col gap-12">
      <div className='relative w-full min-h-[627px] max-h-[627px] bg-[url("/images/sample-hero.webp")] bg-cover bg-center'>
        <div className="w-full min-h-[627px] max-h-[627px] flex flex-col gap-8 items-center justify-center bg-black bg-opacity-50 text-white font-source-sans-pro">
          <h2 className="text-3xl">
            Temukan solusi terbaik untuk kebutuhan anda
          </h2>

          <div className="w-[25%] flex flex-col text-center gap-4">
            <h3 className="text-4xl font-bold">PRODUK KAMI</h3>
            <TextField type="search" placeholder="Cari Produk" dimension="lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 pt-12 pb-20 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <CardMarket
            key={i}
            name="Kopi"
            price={15000}
            href="/products/detail/1"
            imageUrl="/images/kopi.webp"
          />
        ))}
      </div>
    </section>
  );
};
