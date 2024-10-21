'use client';
import {
  createOrder,
  deleteCartItems,
  getOneCart,
} from '@pkm/libs/actions/market';
import { cn } from '@pkm/libs/clsx';
import { CartsWithItems } from '@pkm/libs/drizzle/market';
import { changeFileName, compressImage } from '@pkm/libs/entities';
import { useUploadThing } from '@pkm/libs/uploadthing/market/client';
import {
  Button,
  CardCart,
  CheckBox,
  Radio,
  Textarea,
  TextField,
} from '@pkm/ui';
import { useSession } from 'next-auth/react';
import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const CartsModule: FC = (): ReactElement => {
  const [cart, setCart] = useState<CartsWithItems>({} as CartsWithItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer' | null>(
    null
  );
  const [approved, setApproved] = useState(false);
  const [image, setImage] = useState<File[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: session } = useSession();

  const { startUpload, isUploading } = useUploadThing('imageUploader');

  const getCart = useCallback(async () => {
    await getOneCart(session?.user?.id as string).then((res) => {
      if (res?.status?.ok) {
        setCart(res?.data as CartsWithItems);
      }
    });
  }, [session?.user?.id]);

  const filteredCart = useMemo(() => {
    return cart?.cartItems?.filter((item) => !item.isCompleted);
  }, [cart]);

  const handleSubmit = async (formdata: FormData) => {
    try {
      const notes = formdata.get('notes') as string;

      if (image?.[0]) {
        const result = await startUpload(image);

        if (result) {
          await createOrder({
            cartId: cart?.id as string,
            image: result[0].url,
            cartItemsIds: selectedItems,
            notes,
          });
        }
      } else {
        await createOrder({
          cartId: cart?.id as string,
          image: null,
          cartItemsIds: selectedItems,
          notes,
        });
      }

      await getCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <section className="w-full h-full flex flex-col items-center gap-[10rem] px-20 py-28">
      {filteredCart?.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-3xl font-bold text-neutral-60%">
            Keranjang Belanja Kosong
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-12">
            {filteredCart?.map((item, i) => (
              <CardCart
                key={i}
                name={item?.product?.name}
                amount={item?.quantity}
                imageUrl={item?.product?.image}
                value={item?.id}
                price={item?.product?.price}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTotalPrice(
                      totalPrice + item?.product?.price * item?.quantity
                    );
                    setSelectedItems([...selectedItems, item?.id]);
                  } else {
                    setTotalPrice(
                      totalPrice - item?.product?.price * item?.quantity
                    );
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
                  if (selectedItems.includes(item?.id)) {
                    setTotalPrice(
                      totalPrice - item?.product?.price * item?.quantity
                    );
                  }
                }}
              />
            ))}
          </div>

          <div className="w-full flex justify-between items-center px-20 text-2xl font-bold">
            <p>TOTAL PEMBELIAN</p>
            <p>Rp.{totalPrice?.toLocaleString('id-ID') || 0}</p>
          </div>
        </div>
      )}

      <div className="w-[70%] max-h-[624px] flex flex-col bg-neutral-10% shadow-md rounded-lg">
        <p className="py-5 w-full text-center text-xl border-b border-neutral">
          Informasi Pembelian
        </p>

        <form
          action={handleSubmit}
          className="w-full flex flex-col items-center gap-20 pt-14 pb-8"
        >
          <div className="w-full flex justify-center gap-24">
            <fieldset className="flex flex-col gap-6">
              <p className="font-source-sans-pro text-lg">Metode Pemesanan</p>
              <Radio
                label="Pick Up"
                value="pickup"
                sublabel="Ambil sendiri ditempat atau di toko"
                name="order"
                disabled={filteredCart?.length === 0}
              />

              <Textarea
                name="notes"
                dimension="lg"
                placeholder="Catatan Tambahan, contoh bila ingin janjian ambil barang, tetapi tidak di toko (opsional)"
                className="w-full min-w-[353px] min-h-[117px]"
                disabled={filteredCart?.length === 0}
              />
            </fieldset>

            <fieldset className="flex flex-col gap-6">
              <p className="font-source-sans-pro text-lg">Metode Pemesanan</p>
              <Radio
                label="Cash"
                value="cod"
                sublabel="Bayar ditempat"
                name="payment"
                onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                disabled={filteredCart?.length === 0}
              />
              <Radio
                label="Transfer"
                value="transfer"
                sublabel="Bayar menggunakan  ATM BCA 4490******"
                name="payment"
                onChange={(e) => setPaymentMethod(e.target.value as 'transfer')}
                disabled={filteredCart?.length === 0}
              />

              {paymentMethod === 'transfer' && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="file" className="font-source-sans-pro">
                    Upload bukti pembayaran
                  </label>
                  <TextField
                    name="file"
                    type="file"
                    placeholder="Upload bukti pembayaran"
                    onChange={async (e) => {
                      if (e.target.files) {
                        const file = changeFileName({
                          file: e.target.files[0],
                          prefix: 'order',
                          uniqueId: session?.user?.id as string,
                        });

                        const compressedFile = await compressImage(file, {
                          quality: 0.6,
                          type: 'image/jpeg',
                        });

                        if (compressedFile) {
                          setImage([compressedFile]);
                        }
                      }
                    }}
                  />
                </div>
              )}
            </fieldset>
          </div>

          <div className="flex flex-col gap-6 items-center">
            <div className="flex gap-4">
              <CheckBox
                name="approve"
                shape="square"
                size="sm"
                onChange={(e) => setApproved(e.target.checked)}
                disabled={filteredCart?.length === 0}
              />
              <p
                className={cn('font-montserrat text-sm font-medium', {
                  'text-neutral-80%': filteredCart?.length === 0,
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
                filteredCart?.length === 0 ||
                selectedItems.length === 0 ||
                !paymentMethod ||
                !approved
              }
              isLoading={isUploading}
            >
              Buat Pesanan
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
