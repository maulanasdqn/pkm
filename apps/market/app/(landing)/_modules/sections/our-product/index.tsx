import { Button } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { ProductCarousel } from './products';
import { getAllProducts } from '@pkm/libs/actions/market';
export const OurProductSection: FC = async (): Promise<ReactElement> => {
  const products = await getAllProducts(6);

  return (
    <div className="w-full flex flex-col font-source-sans-pro mt-8 gap-12">
      <div className="w-full flex justify-between items-center lg:items-end">
        <h3 className="text-3xl lg:text-4xl">Produk Kami</h3>

        <Button
          href="/products"
          variant="text"
          size="lg"
          className="font-source-sans-pro lg:text-2xl text-black text-sm"
        >
          Lihat Semua
        </Button>
      </div>

      <ProductCarousel products={products?.data} />
    </div>
  );
};
