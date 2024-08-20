import { FC, ReactElement } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@pkm/ui';
import Image from 'next/image';

const news = [
  {
    img: '/images/mountain.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
  {
    img: '/images/mountain.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
  {
    img: '/images/mountain.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
  {
    img: '/images/mountain.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
];

export const NewsSection: FC = (): ReactElement => {
  return (
    <section className="w-full h-full font-source-sans-pro my-16">
      <div className="pb-20">
        <h1 className="container mx-auto px-14 mb-10 text-4xl font-semibold text-primary-70%">
          Informasi Tentang Wisata Desa
        </h1>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          className="w-full max-w-full"
        >
          <CarouselContent>
            {news.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3 cursor-pointer">
                <div className="p-1">
                  <div className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 bg-white">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={515}
                      height={281}
                      className="h-[300px] w-full aspect-video rounded-lg"
                    />
                    <div className="flex flex-col gap-3 items-center justify-center p-6">
                      <h1 className="text-xl text-primary-70%">
                        <span>{item.location},</span>
                        <span>{item.createdAt}</span>
                        <span> - </span>
                        <span>{item.title}</span>
                      </h1>
                      <div className="pt-3 border-t border-neutral-60% text-lg">
                        <p className="line-clamp-4">{item.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
