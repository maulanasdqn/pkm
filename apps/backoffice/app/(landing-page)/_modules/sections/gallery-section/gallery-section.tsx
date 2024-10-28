import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@pkm/ui';
import { dataGallery } from '@pkm/libs/entities';

const data = dataGallery.splice(0, 5);

export const GallerySection: React.FC = (): React.ReactElement => {
  return (
    <section className="container flex flex-col py-14 gap-6 items-center justify-center">
      <div className="flex w-full justify-between items-center py-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          Galeri Kegiatan Sosial
        </h1>
        <Link
          href="/kegiatan"
          className="text-primary font-medium text-base md:text-lg hover:underline underline-offset-2"
        >
          Lihat semua
        </Link>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
        }}
        showDotNavigator
        className="w-full max-w-full"
      >
        <CarouselContent>
          {data.length > 0 ? (
            data.map(({ img, title }, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <div key={img} className="relative">
                  <Image
                    src={img}
                    alt={title}
                    height={300}
                    width={450}
                    className="object-cover w-full h-[300px]"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[350px] bg-primary px-4 py-2 rounded text-center">
                    <h1 className="text-base md:text-lg font-semibold uppercase text-white">
                      {title}
                    </h1>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            <React.Fragment>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-1/3 pl-0"
                >
                  <div className="p-5 bg-white">
                    <div className="h-[300px] w-full animate-pulse aspect-auto rounded bg-neutral-50%" />
                  </div>
                </CarouselItem>
              ))}
            </React.Fragment>
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
