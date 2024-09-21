import { cn } from '@pkm/libs/clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

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
  {
    img: '/images/news-3.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
  {
    img: '/images/news-4.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
  {
    img: '/images/news.png',
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

export const NewsListSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section
      className={cn(
        'container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6',
        className
      )}
    >
      {news.map((item, index) => (
        <Link
          href={`/news/${index + 1}`}
          title={item.title}
          key={index}
          className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all duration-500 bg-white"
        >
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
        </Link>
      ))}
    </section>
  );
};
