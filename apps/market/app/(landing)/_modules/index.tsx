import { Button } from '@pkm/ui';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { OurProductSection } from './sections';
import { ActivitySection } from './sections/activity';
import Link from 'next/link';
import { getAllCategoriesProduct } from '@pkm/libs/actions/market';

export const LandingModule: FC = async (): Promise<ReactElement> => {
  const { data } = await getAllCategoriesProduct();

  const categoriesImages = [
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
    {
      name: 'Siap Saji',
      image: '/images/siap-saji.webp',
    },
  ];

  const categories = data?.map((item) => {
    const image = categoriesImages?.find(
      (image) => image.name === item.name
    )?.image;
    if (image) {
      return {
        id: item.id,
        name: item.name,
        image,
      };
    }
  });

  return (
    <section className="flex flex-col pt-20 pb-16 justify-center items-center gap-20 container mx-auto">
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

        <div className='bg-[url("/images/landing-image.webp")] bg-center bg-cover w-full h-[400px]'>
          <div className="bg-black bg-opacity-35 w-full min-h-full flex flex-col items-center justify-center gap-4 font-source-sans-pro pt-16">
            <p className="text-white text-2xl">
              Daftarkan produkmu dan raih lebih banyak pelanggan!
            </p>
            <Button
              href="/auth/register"
              color="red"
              className="px-16 font-normal text-xl"
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-12 items-center mt-4">
          <h3 className="text-4xl">Kategori Produk</h3>
          <div className="w-full flex justify-evenly items-center">
            {categories?.map((item, index) => (
              <Link
                href={`/categories/${item?.id}`}
                key={index}
                className="py-3 px-6 flex flex-col items-center justify-center gap-1 bg-primary-20% rounded-2xl max-w-[120px] max-h-[120px] transition-all duration-300 hover:scale-110"
              >
                <Image
                  alt={item?.name || ''}
                  src={item?.image as string}
                  width={200}
                  height={200}
                  quality={100}
                  className="w-14"
                />
                <p className="text-lg">{item?.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <OurProductSection />
      </div>

      <ActivitySection />
    </section>
  );
};
