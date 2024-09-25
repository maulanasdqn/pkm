'use client';
import { FC, ReactElement, useEffect, useState } from 'react';
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
import { TInformationSchema } from '@pkm/libs/entities';
import { getAllInformations } from '@pkm/libs/actions/tourism';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

const LIMIT_COUNT = 6;

export const NewsSection: FC = (): ReactElement => {
  const [data, setData] = useState<TInformationSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const destinations = await getAllInformations({ perPage: LIMIT_COUNT });

      if (destinations.status.ok) {
        setData(destinations.data);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="w-full h-full font-source-sans-pro my-8 md:my-14 lg:my-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-14 mb-5 md:mb-10 pb-10 md:pb-14 lg:pb-20 space-y-5 md:space-y-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl my-5 md:my-10 lg:my-14 font-semibold text-primary-70%">
          Informasi Tentang Wisata Desa
        </h1>
        <div className="mx-auto px-10 md:px-0">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {data.length > 0 ? (
                data.map((item, index) => {
                  const date = new Date(item?.createdAt as Date);
                  const value = format(date, 'dd MMMM yyyy', { locale: id });
                  return (
                    <CarouselItem
                      key={index}
                      className="basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <Link href={`/news/${index + 1}`} className="p-1">
                        <div className="w-full border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={515}
                            height={250}
                            className="h-[250px] w-full aspect-video rounded-lg object-cover"
                          />
                          <div className="flex flex-col gap-3 items-center justify-center p-6">
                            <h1 className="text-xl text-primary-70%">
                              <span>{item.location},</span>
                              <span> {value}</span>
                              <span> - </span>
                              <span>{item.title}</span>
                            </h1>
                            <div className="pt-3 border-t border-neutral-60% text-lg">
                              <p className="line-clamp-4">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  );
                })
              ) : (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="w-full border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white">
                        <div className="h-[250px] w-full aspect-video rounded-lg animate-pulse bg-neutral-50%" />
                        <div className="flex flex-col gap-3 items-center justify-center p-6">
                          <div className="h-[100px] bg-neutral-50% animate-pulse" />
                          <div className="pt-3 border-t border-neutral-60% text-lg">
                            <p className="line-clamp-4">-</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex w-full justify-center">
          <Button href="/news" size="lg" variant="secondary">
            Informasi Lainnya
          </Button>
        </div>
      </div>
    </section>
  );
};
