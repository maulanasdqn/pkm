'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { Button, Carousel, CarouselContent, CarouselItem } from '@pkm/ui';
import { TDestinationSchema } from '@pkm/libs/entities';
import { getAllDestinations } from '@pkm/libs/actions/tourism';
import { sendGTMEvent } from '@next/third-parties/google';
import { isMobile } from 'react-device-detect';

const LIMIT_COUNT = 4;

export const DestinationSection: FC = (): ReactElement => {
  const [data, setData] = useState<TDestinationSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const destinations = await getAllDestinations({ perPage: LIMIT_COUNT });
      const device = isMobile ? 'mobile' : 'desktop';
      sendGTMEvent({ event: 'visitor', value: device, date: new Date() });

      if (destinations.status.ok) {
        setData(destinations.data);
      }
    };
    fetchData();
  }, []);
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
        className="absolute bottom-0 left-0 aspect-video -z-10 max-h-[300px] object-cover"
      />
      <div className="pb-10 md:pb-14 lg:pb-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-14 mb-5 md:mb-10 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-70%">
            Destinasi Wisata
          </h1>
          <Button
            size="lg"
            variant="text"
            href="/tours"
            className="p-0 hover:underline text-sm md:text-base lg:text-lg"
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
            {data.length > 0 ? (
              data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3 pl-0"
                >
                  <div className="p-5">
                    <Link href={`/tours/${item.id}`} className="relative">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={560}
                        height={300}
                        quality={100}
                        className="h-[300px] w-full aspect-video object-cover rounded size-auto"
                      />
                      <div className="absolute z-10 -bottom-5 left-1/2 -translate-x-1/2 rounded py-2 px-5 text-primary-80% bg-white">
                        {item.name}
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
