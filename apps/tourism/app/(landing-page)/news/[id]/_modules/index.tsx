import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

const newsDetail = {
  img: '/images/mountain.png',
  createdAt: '15 Agustus 2024',
  location: 'Bandung',
  title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
  content:
    'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
};
const news = [
  {
    img: '/images/news.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
  {
    img: '/images/news-2.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
];

export const NewsDetailModule: FC = (): ReactElement => {
  return (
    <>
      <section className="container w-full flex flex-col gap-8 pt-10 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-70%">
          Informasi
        </h1>
        <div className="lg:grid grid-cols-3 gap-4">
          <div className="col-span-2 w-full flex flex-col gap-8">
            <Image
              src={newsDetail.img}
              alt="mountain"
              width={913}
              height={425}
              quality={100}
              className="w-full max-h-[425px] aspect-video rounded"
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl text-primary-70%">
              <span>{newsDetail.location},</span>
              <span> {newsDetail.createdAt}</span>
              <span> - </span>
              <span>{newsDetail.title}</span>
            </h2>
            <p className="text-base md:text-lg mb-10 lg:mb-0">
              {newsDetail.content}
            </p>
          </div>
          <aside className="flex flex-col w-full gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-primary-70%">
              Informasi Lainnya
            </h1>
            <div className="flex gap-4 flex-col sm:flex-row lg:flex-col">
              {news.map((item, index) => (
                <Link
                  key={index}
                  href={`/news/${index}`}
                  className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={515}
                    height={200}
                    className="h-[200px] w-full aspect-video rounded-lg"
                  />
                  <div className="flex flex-col gap-3 items-center justify-center p-3">
                    <h1 className="text-xl text-primary-70%">
                      <span>{item.location},</span>
                      <span> {item.createdAt}</span>
                      <span> - </span>
                      <span>{item.title}</span>
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};
