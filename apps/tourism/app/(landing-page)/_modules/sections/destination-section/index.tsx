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
      className="w-full h-full relative mt-20 mb-8 container mx-auto font-source-sans-pro"
    >
      <div className="pb-10 md:pb-14 lg:pb-20 flex flex-col gap-6">
        <div className="flex w-full gap-4 items-center mb-6">
          <h2 className="text-xl md:text-3xl whitespace-nowrap font-semibold">
            Destinasi Wisata Populer
          </h2>
          <div className="h-[1px] w-full bg-gray" />
          <Button
            href="/tours"
            variant="text"
            color="primary"
            className="border border-primary"
          >
            Lihat Semua Destinasi
          </Button>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          showDotNavigator
          className="w-full max-w-full mt-6"
        >
          <CarouselContent>
            {data.length > 0 ? (
              data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative">
                    <Link href={`/tours/${item.id}`}>
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={560}
                        height={300}
                        quality={100}
                        className="h-[300px] w-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-4">
                        <h3 className="text-xl font-bold">{item.name}</h3>
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
