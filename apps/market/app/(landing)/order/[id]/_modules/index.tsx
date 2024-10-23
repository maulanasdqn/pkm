import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { TOrderModule } from './types';
import { getOneOrders } from '@pkm/libs/actions/market';
import { redirect } from 'next/navigation';

export const OrderModule: FC<TOrderModule> = async ({
  id,
}): Promise<ReactElement> => {
  const { data, status } = await getOneOrders(id);

  if (!status.ok) {
    redirect('/');
  }

  const orderData = [
    {
      title: 'Nama',
      value: data?.user.fullname,
    },

    {
      title: 'Email',
      value: data?.user.email,
    },

    {
      title: 'No. Telepon',
      value: data?.user.phoneNumber,
    },
    {
      title: 'Produk',
      value: data?.cartItems
        ?.map((item) => {
          return `${item?.product?.name} (${item?.quantity} pcs)`;
        })
        .join(', '),
    },
    {
      title: 'Metode Pembayaran',
      value: data?.image ? 'Cash' : 'Transfer Bank',
    },
    {
      title: 'Total',
      value: `Rp. ${data?.totalPrice?.toLocaleString('id-ID')}`,
    },
    {
      title: 'Catatan Tambahan',
      value: data?.notes,
    },
  ];

  return (
    <section className="w-full flex flex-col justify-center items-center px-28 pt-6 pb-[7rem] gap-12 font-source-sans-pro">
      <div className="w-full flex flex-col justify-center items-center gap-6 relative">
        <Image
          src="/images/money.webp"
          alt="reservation page"
          width={1000}
          height={1000}
          quality={100}
          className="object-cover object-center min-w-[696px] max-w-[696px]"
        />

        <div className="flex flex-col items-center gap-4 relative bg-white bottom-16 pt-10">
          <p className="text-4xl font-bold">Pesanan Berhasil</p>

          <p className="text-2xl w-[80%] text-center">
            Terimakasih telah memesan produk kami. Tunggu konfirmasi
            selanjutnya, kami akan segera menghubungi anda, mohon bersabar.
          </p>
        </div>
      </div>

      <div className="w-full rounded-lg min-h-[700px] bg-neutral-10% relative flex flex-col items-center gap-10">
        <div className="bg-neutral-30% text-4xl font-bold text-center px-20 py-4 relative rounded-lg bottom-9">
          Detail Pesanan
        </div>
        <div className="w-full flex flex-col gap-6 px-14">
          {orderData?.map((item, i) => (
            <div key={i} className="w-full flex gap-10 items-center text-3xl">
              <p className="xl:w-[30%] w-full">{item?.title}</p>
              <p className="w-full">: {item?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
