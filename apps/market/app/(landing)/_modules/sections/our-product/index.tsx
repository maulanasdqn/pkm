import { Button, CardMarket } from '@pkm/ui';
import { FC, ReactElement } from 'react';
export const OurProductSection: FC = (): ReactElement => {
  return (
    <div className="w-full flex flex-col font-source-sans-pro mt-8 gap-12">
      <div className="w-full flex justify-between items-end">
        <h3 className="text-4xl">Produk Kami</h3>

        <Button
          href="/products"
          variant="text"
          size="lg"
          className="font-source-sans-pro text-2xl text-black"
        >
          Lihat Semua
        </Button>
      </div>

      <div className="w-full flex justify-around">
        <CardMarket
          href="#"
          name="Kopi"
          price={15000}
          imageUrl="/images/kopi.webp"
        />
        <CardMarket
          href="#"
          name="Kopi"
          price={15000}
          imageUrl="/images/kopi.webp"
        />
        <CardMarket
          href="#"
          name="Kopi"
          price={15000}
          imageUrl="/images/kopi.webp"
        />
      </div>
    </div>
  );
};
