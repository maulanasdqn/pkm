import { getAllProducts } from '@pkm/libs/actions/market';
import { CardMarket, HeroMarket, TextField } from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const ProductsModule: FC = async (): Promise<ReactElement> => {
  const products = await getAllProducts();

  return (
    <section className="w-full h-full flex items-center flex-col gap-12">
      <HeroMarket imageUrl="/images/sample-hero.webp" className="gap-8">
        <h2 className="text-3xl">
          Temukan solusi terbaik untuk kebutuhan anda
        </h2>

        <div className="w-[25%] flex flex-col text-center gap-4">
          <h3 className="text-4xl font-bold">PRODUK KAMI</h3>
          <TextField type="search" placeholder="Cari Produk" dimension="lg" />
        </div>
      </HeroMarket>

      <div className="grid grid-cols-3 pt-12 pb-20 gap-6">
        {products?.data?.map((item, i) => (
          <CardMarket
            key={i}
            name={item?.name}
            price={item?.price}
            href={`/products/${item?.id}`}
            imageUrl={item?.image}
          />
        ))}
      </div>
    </section>
  );
};
