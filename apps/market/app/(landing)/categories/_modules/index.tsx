import { CardMarket, HeroMarket, TextField } from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const CategoriesModule: FC<{ id: string }> = ({ id }): ReactElement => {
  return (
    <section className="w-full h-full flex items-center flex-col gap-12">
      <HeroMarket
        imageUrl="/images/sample-categories.webp"
        className="gap-8 bg-opacity-40"
      >
        <hgroup className="flex flex-col gap-4 items-center">
          <h2 className="text-4xl font-bold">KATEGORI PRODUK</h2>
          <h3 className="text-3xl capitalize">Pertanian {id}</h3>
        </hgroup>

        <div className="w-[25%]">
          <TextField type="search" placeholder="Cari Kategori" dimension="lg" />
        </div>
      </HeroMarket>

      <div className="grid grid-cols-3 pt-12 pb-20 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <CardMarket
            key={i}
            name="Kopi"
            price={15000}
            href="/products/1"
            imageUrl="/images/kopi.webp"
          />
        ))}
      </div>
    </section>
  );
};
