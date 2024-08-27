import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { Button, Carousel, CarouselContent, CarouselItem } from '@pkm/ui';
import Link from 'next/link';

const destinations = [
  {
    img: '/images/angklung.png',
    category: 'Pertunjukan',
  },
  {
    img: '/images/lake.png',
    category: 'Danau',
  },
  {
    img: '/images/angklung.png',
    category: 'Pertunjukan',
  },
  {
    img: '/images/rice-field.jpeg',
    category: 'Pesawahan',
  },
];

export const DestinationSection: FC = (): ReactElement => {
  return (
    <section
      id="destination"
      className="w-full h-full relative 2xl:container 2xl:mx-auto font-source-sans-pro"
    >
      <Image
        src="/images/bg-grass.webp"
        alt="grass-bg"
        width={1536}
        height={295}
        className="absolute bottom-0 left-0 aspect-video"
      />
      <div className="pb-20">
        <div className="container mx-auto px-14 mb-10 flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-primary-70%">
            Destinasi Wisata
          </h1>
          <Button
            size="lg"
            variant="text"
            href="/tours"
            className="p-0 hover:underline text-lg"
          >
            Destinasi lainnya
          </Button>
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
            {destinations.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3 pl-0">
                <div className="p-5">
                  <Link href={`/tours/${index + 1}`} className="relative">
                    <Image
                      src={item.img}
                      alt={item.category}
                      width={560}
                      height={300}
                      quality={100}
                      className="h-[300px] w-full aspect-video rounded"
                    />
                    <div className="absolute z-10 -bottom-5 left-1/2 -translate-x-1/2 rounded py-2 px-5 text-primary-80% bg-white">
                      {item.category}
                    </div>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
