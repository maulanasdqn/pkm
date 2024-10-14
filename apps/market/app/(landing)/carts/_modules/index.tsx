'use client';
import { deleteCartItems, getOneCart } from '@pkm/libs/actions/market';
import { cn } from '@pkm/libs/clsx';
import { CartsWithItems } from '@pkm/libs/drizzle/market';
import {
  Button,
  CardCart,
  CheckBox,
  Radio,
  Textarea,
  TextField,
} from '@pkm/ui';
import { useSession } from 'next-auth/react';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';

export const CartsModule: FC = (): ReactElement => {
  const [cart, setCart] = useState<CartsWithItems>({} as CartsWithItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data: session } = useSession();

  const getCart = useCallback(async () => {
    await getOneCart(session?.user?.id as string).then((res) => {
      if (res?.status?.ok) {
        setCart(res?.data as CartsWithItems);
      }
    });
  }, [session?.user?.id]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <section className="w-full h-full flex flex-col items-center gap-[10rem] px-20 py-28">
      {cart?.cartItems?.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-3xl font-bold text-neutral-60%">
            Keranjang Belanja Kosong
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-12">
            {cart?.cartItems?.map((item, i) => (
              <CardCart
                key={i}
                name={item?.product?.name}
                amount={item?.quantity}
                imageUrl={item?.product?.image}
                value={item?.id}
                price={item?.product?.price}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems([...selectedItems, item?.id]);
                  } else {
                    setSelectedItems(
                      selectedItems.filter((i) => i !== item?.id)
                    );
                  }
                }}
                onDelete={async (e) => {
                  e.preventDefault();
                  await deleteCartItems(
                    item?.id as string,
                    session?.user?.id as string,
                    item?.product?.id as string
                  );
                  await getCart();
                  setSelectedItems(selectedItems.filter((i) => i !== item?.id));
                }}
              />
            ))}
          </div>

          <div className="w-full flex justify-between items-center px-20 text-2xl font-bold">
            <p>TOTAL PEMBELIAN</p>
            <p>Rp.{cart?.totalPrice?.toLocaleString('id-ID') || 0}</p>
          </div>
        </div>
      )}

      <div className="w-[70%] max-h-[624px] flex flex-col bg-neutral-10% shadow-md rounded-lg">
        <p className="py-5 w-full text-center text-xl border-b border-neutral">
          Informasi Pembelian
        </p>

        <form className="w-full flex flex-col items-center gap-20 pt-14 pb-8">
          <div className="w-full flex justify-center gap-24">
            <fieldset className="flex flex-col gap-6">
              <p className="font-source-sans-pro text-lg">Metode Pemesanan</p>
              <Radio
                label="Pick Up"
                sublabel="Ambil sendiri ditempat atau di toko"
                name="order"
                // disabled={cart?.cartItems?.length === 0}
              />

              <Textarea
                name="note"
                dimension="lg"
                placeholder="Catatan Tambahan"
                className="w-full min-w-[353px] min-h-[117px]"
                disabled={cart?.cartItems?.length === 0}
              />
            </fieldset>

            <fieldset className="flex flex-col gap-6">
              <p className="font-source-sans-pro text-lg">Metode Pemesanan</p>
              <Radio
                label="Cash"
                sublabel="Bayar ditempat"
                name="payment"
                // disabled={cart?.cartItems?.length === 0}
              />
              <Radio
                label="Transfer"
                sublabel="Bayar menggunakan  ATM BCA 4490******"
                name="payment"
                // disabled={cart?.cartItems?.length === 0}
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="file" className="font-source-sans-pro">
                  Upload bukti pembayaran
                </label>
                <TextField
                  name="file"
                  type="file"
                  placeholder="Upload bukti pembayaran"
                />
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col gap-6 items-center">
            <div className="flex gap-4">
              <CheckBox
                name="approve"
                shape="square"
                size="sm"
                disabled={cart?.cartItems?.length === 0}
              />
              <p
                className={cn('font-montserrat text-sm font-medium', {
                  'text-neutral-80%': cart?.cartItems?.length === 0,
                })}
              >
                Data yang saya masukkan sudah benar
              </p>
            </div>

            <Button
              size="md"
              color="red"
              type="submit"
              className="text-lg font-normal"
              disabled={
                cart?.cartItems?.length === 0 || selectedItems.length === 0
              }
            >
              Buat Pesanan
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
