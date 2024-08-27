import { FC, ReactElement } from 'react';
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@pkm/ui';
import Image from 'next/image';
import Link from 'next/link';

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
    <section className="w-full h-full font-source-sans-pro my-20">
      <div className="container mx-auto pb-20 space-y-8">
        <h1 className="px-14 my-14 text-4xl font-semibold text-primary-70%">
          Informasi Tentang Wisata Desa
        </h1>
        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {news.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3 ">
                <Link href={`/news/${index + 1}`} className="p-1">
                  <div className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={515}
                      height={250}
                      className="h-[250px] w-full aspect-video rounded-lg"
                    />
                    <div className="flex flex-col gap-3 items-center justify-center p-6">
                      <h1 className="text-xl text-primary-70%">
                        <span>{item.location},</span>
                        <span> {item.createdAt}</span>
                        <span> - </span>
                        <span>{item.title}</span>
                      </h1>
                      <div className="pt-3 border-t border-neutral-60% text-lg">
                        <p className="line-clamp-4">{item.content}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex w-full justify-center">
          <Button href="/news" size="lg" variant="secondary">
            Informasi Lainnya
          </Button>
        </div>
      </div>
    </section>
  );
};
