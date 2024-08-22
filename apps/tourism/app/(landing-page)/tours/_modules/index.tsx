import Image from 'next/image';
import { FC, ReactElement } from 'react';

const tours = [
  {
    img: '/images/angklung.png',
    category: 'pertunjukan',
    description:
      'Pertujukan alat musik tradisional yang terbuat dari bambu. Alat musik ini dimainkan dengan cara digoyangkan sehingga menghasilkan suara dari tabung-tabung bambu yang disusun sesuai dengan tangga nada.',
  },
  {
    img: '/images/lake.png',
    category: 'Danau',
    description:
      'Danau sering menjadi pusat perhatian wisatawan karena keindahannya yang alami. Air yang tenang dan jernih, dikelilingi oleh pepohonan hijau, menciptakan pemandangan yang menenangkan dan memanjakan mata. ',
  },
  {
    img: '/images/rice-field.jpeg',
    category: 'Fotogenik Sawah',
    description:
      'Fotogenik Sawah adalah salah satu atraksi utama di destinasi wisata desa yang menawarkan keindahan lanskap pedesaan yang menawan. Berikut adalah penjelasan tentang Fotogenik Sawah sebagai daya tarik wisata.',
  },
  {
    img: '/images/angklung.png',
    category: 'pertunjukan',
    description:
      'Pertujukan alat musik tradisional yang terbuat dari bambu. Alat musik ini dimainkan dengan cara digoyangkan sehingga menghasilkan suara dari tabung-tabung bambu yang disusun sesuai dengan tangga nada.',
  },
  {
    img: '/images/lake.png',
    category: 'Danau',
    description:
      'Danau sering menjadi pusat perhatian wisatawan karena keindahannya yang alami. Air yang tenang dan jernih, dikelilingi oleh pepohonan hijau, menciptakan pemandangan yang menenangkan dan memanjakan mata. ',
  },
  {
    img: '/images/rice-field.jpeg',
    category: 'Fotogenik Sawah',
    description:
      'Fotogenik Sawah adalah salah satu atraksi utama di destinasi wisata desa yang menawarkan keindahan lanskap pedesaan yang menawan. Berikut adalah penjelasan tentang Fotogenik Sawah sebagai daya tarik wisata.',
  },
];

export const ToursPageModule: FC = (): ReactElement => {
  return (
    <div className="min-h-screen relative w-full flex flex-col items-center">
      <Image
        src="/images/bg-lake.webp"
        alt="bg-lake"
        width={1536}
        height={600}
        quality={100}
        className="h-[600px] absolute top-0 -z-10"
      />
      <Image
        src="/images/bg-grass.webp"
        alt="bg-grass"
        width={1536}
        height={1450}
        quality={100}
        className="h-[1450px] absolute bottom-0 -z-10"
      />
      <h1 className="text-4xl font-bold text-white py-40">
        Destinasi Wisata Desa Bojongsari
      </h1>
      <div className="grid grid-cols-2 container mx-auto px-16 gap-8 pb-[10rem]">
        {tours.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-white shadow-md rounded cursor-pointer"
          >
            <div className="relative">
              <Image
                src={item.img}
                alt={item.category}
                width={560}
                height={300}
                quality={100}
                className="h-[300px] w-full aspect-video rounded"
              />
              <span className="absolute z-10 -bottom-5 left-1/2 -translate-x-1/2 rounded py-2 px-5 text-lg font-semibold text-primary-80% bg-white shadow-md capitalize">
                {item.category}
              </span>
            </div>
            <p className="text-lg mt-5 line-clamp-5">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
