'use client';
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Alert, Button, HeroMarket } from '@pkm/ui';
import Image from 'next/image';
import { FC, Fragment, ReactElement, useState } from 'react';
import { TProductIdModule } from './types';
import { insertCart } from '@pkm/libs/actions/market';
import { useSession } from 'next-auth/react';

export const ProductIdModule: FC<TProductIdModule> = ({
  product,
}): ReactElement => {
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAddQuantity = () => {
    if (quantity === product?.stock) return;
    setQuantity(quantity + 1);
  };

  const handleReduceQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const { data: session } = useSession();

  const handleAddToCart = async () => {
    try {
      if (!session?.user?.id) {
        return setError('Silahkan login terlebih dahulu');
      }

      if (quantity > product?.stock) {
        return setError('Jumlah melebihi stok');
      }

      await insertCart({
        userId: session?.user?.id as string,
        productId: product?.id,
        quantity: quantity,
      });

      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setIsSuccess(false);
    }
  };

  return (
    <Fragment>
      <HeroMarket imageUrl="/images/sample-hero-3.webp" className="gap-6">
        <h2 className="text-4xl font-bold">DETAIL PRODUK</h2>
        <h3 className="text-3xl uppercase">{product?.name}</h3>
      </HeroMarket>

      <div className="w-full h-full py-20 flex flex-col justify-center items-center gap-20">
        <Image
          src={product?.image}
          alt="sample-product"
          width={500}
          height={500}
          quality={100}
          className="min-w-[778px] max-w-[778px] min-h-[580px] max-h-[580px] rounded-lg object-cover object-center"
        />

        {/* Detail */}
        <div className="w-full max-w-[808px]  max-h-[639px] rounded-[10px] flex flex-col gap-8 p-12 bg-neutral-10% shadow-md font-source-sans-pro">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">{product?.name}</h2>

            <div className="flex flex-col gap-2 text-lg">
              <div className="flex items-center gap-6">
                <div className="flex gap-2">
                  {product?.sold || 0}{' '}
                  <span className="text-neutral-60%">Terjual</span>
                </div>

                <div className="flex gap-2">
                  {product?.stock}{' '}
                  <span className="text-neutral-60%">Stok Tersedia</span>
                </div>
              </div>

              <h3 className="text-red-50% text-2xl">
                Rp {product?.price.toLocaleString('id-ID')}/pcs
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-bold">Deskripsi</h3>
            <p className="text-xl">{product?.description}</p>
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
                disabled={quantity === product?.stock}
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
              onClick={handleAddToCart}
            >
              <ShoppingCartOutlined className="text-lg relative -top-[0.2px]" />
              Masukan Keranjang
            </Button>
          </div>
        </div>
      </div>

      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="Produk ditambahkan ke keranjang"
        variant="success"
        timer={3000}
      />

      <Alert
        show={!!error}
        onHide={() => setError('')}
        message={error}
        variant="error"
        timer={3000}
      />
    </Fragment>
  );
};
