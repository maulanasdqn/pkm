'use client';
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from '@pkm/ui';
import Image from 'next/image';
import { FC, ReactElement, useState } from 'react';

const sold = 10;
const stock = 30;

export const ProductIdModule: FC = (): ReactElement => {
  const [quantity, setQuantity] = useState(1);

  const handleAddQuantity = () => {
    if (quantity === stock) return;
    setQuantity(quantity + 1);
  };

  const handleReduceQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <div className="w-full h-full py-20 flex flex-col justify-center items-center gap-20">
      <Image
        src="/images/kopi.webp"
        alt="sample-product"
        width={500}
        height={500}
        quality={100}
        className="min-w-[778px] max-w-[778px] min-h-[580px] max-h-[580px] rounded-lg object-cover object-center"
      />

      {/* Detail */}
      <div className="w-full max-w-[808px] min-h-[639px] max-h-[639px] rounded-[10px] flex flex-col gap-8 p-12 bg-neutral-10% shadow-md font-source-sans-pro">
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold">Kopi</h2>

          <div className="flex flex-col gap-2 text-lg">
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {sold} <span className="text-neutral-60%">Terjual</span>
              </div>

              <div className="flex gap-2">
                {stock} <span className="text-neutral-60%">Stok Tersedia</span>
              </div>
            </div>

            <h3 className="text-red-50% text-2xl">
              Rp {(35000).toLocaleString('id-ID')}/pcs
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold">Deskripsi</h3>
          <p className="text-xl">
            Kopi Malika adalah jenis kopi yang dikenal karena kualitasnya yang
            tinggi dan cita rasa yang khas. Kopi Malika sering dianggap memiliki
            aroma yang kuat, dengan rasa yang seimbang antara asam dan pahit,
            serta memiliki aftertaste yang lembut dan tahan lama. Beberapa
            sumber menyebutkan bahwa kopi ini diproses dengan metode yang
            teliti, seperti pengeringan alami atau fermentasi yang memberikan
            karakter rasa unik.
          </p>
        </div>

        <div className="relative flex flex-col items-center mt-5 gap-8">
          <div className="w-full flex justify-center items-center gap-8">
            <button
              className="flex items-center h-6 disabled:cursor-not-allowed"
              disabled={quantity === 1}
              onClick={handleReduceQuantity}
            >
              <span className="border-[1.5px] w-6"></span>
            </button>

            <div className="py-1.5 w-full max-w-[111px] text-center rounded-sm text-xl border">
              {quantity}
            </div>

            <button
              onClick={handleAddQuantity}
              disabled={quantity === stock}
              className="disabled:cursor-not-allowed"
            >
              <PlusOutlined className="relative text-2xl border" />
            </button>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="gap-2 max-w-[192px] rounded-[4px] h-10"
            color="black"
          >
            <ShoppingCartOutlined className="text-lg relative -top-[0.2px]" />
            Masukan Keranjang
          </Button>
        </div>
      </div>
    </div>
  );
};
