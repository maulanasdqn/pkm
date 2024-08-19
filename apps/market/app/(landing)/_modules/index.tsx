import { CaretDownOutlined } from '@ant-design/icons';
import { Button } from '@pkm/ui';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { OurProductSection } from './sections';
import { ActivitySection } from './sections/activity';

const cardsContent = [
  {
    name: 'Pertanian',
    image: '/images/pertanian.webp',
  },
  {
    name: 'Perikanan',
    image: '/images/perikanan.webp',
  },
  {
    name: 'Peternakan',
    image: '/images/peternakan.webp',
  },
  {
    name: 'Perkebunan',
    image: '/images/perkebunan.webp',
  },
  {
    name: 'Kerajinan',
    image: '/images/kerajinan.webp',
  },
  {
    name: 'Kesehatan',
    image: '/images/kesehatan.webp',
  },
];

export const LandingModule: FC = (): ReactElement => {
  return (
    <section className="flex flex-col pt-20 pb-10 justify-center items-center gap-20 container mx-auto">
      <div className="w-full flex flex-col px-20 gap-12">
        <div className="flex flex-col gap-10 font-source-sans-pro items-center">
          <h2 className="text-5xl">Digitalisasi Pasar Desa</h2>

          <p className="text-xl w-[660px]">
            Digitalisasi Pasar Desa di desa Bojongsari kecamatan Bojongsoang
            merujuk pada proses memanfaatkan teknologi digital, seperti platform
            online yang bertujuan untuk meningkatkan pendapatan hingga
            memperluas akses pasar.
          </p>
        </div>

        <div className='bg-[url("/images/big-card-market.webp")] bg-center bg-cover w-full flex flex-col items-center justify-center h-[400px] font-source-sans-pro gap-4 pt-16'>
          <p className="text-white text-2xl">
            Daftarkan produkmu dan raih lebih banyak pelanggan!
          </p>
          <Button
            href="/auth/register"
            color="red"
            className="px-16 font-normal text-base"
          >
            <CaretDownOutlined className="text-[9px]" />
            Daftar Sekarang
            <CaretDownOutlined className="text-[9px]" />
          </Button>
        </div>

        <div className="w-full flex flex-col gap-12 items-center mt-4">
          <h3 className="text-4xl">Kategori Produk</h3>
          <div className="w-full flex justify-evenly items-center">
            {cardsContent?.map((item, index) => (
              <button
                key={index}
                className="py-3 px-6 flex flex-col items-center justify-center gap-1 bg-primary-20% rounded-2xl max-w-[120px] max-h-[120px] transition-all duration-300 hover:scale-110"
              >
                <Image
                  alt={item.name}
                  src={item.image}
                  width={200}
                  height={200}
                  quality={100}
                  className="w-14"
                />
                <p className="text-lg">{item.name}</p>
              </button>
            ))}
          </div>
        </div>

        <OurProductSection />
      </div>

      <ActivitySection />
    </section>
  );
};
