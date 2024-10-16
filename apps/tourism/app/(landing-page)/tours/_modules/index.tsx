'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { TDestinationSchema } from '@pkm/libs/entities';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

export const ToursPageModule: FC = (): ReactElement => {
  const [data, setData] = useState<TDestinationSchema[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const destinations = await getAllDestinations();

      if (destinations.status.ok) {
        setData(destinations.data);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="min-h-screen relative w-full flex flex-col items-center">
      <Image
        src="/images/bg-lake.webp"
        alt="bg-lake"
        width={1536}
        height={600}
        quality={100}
        className="h-[600px] absolute top-0 -z-10 object-cover"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white px-8 md:px-0 py-20 md:py-40">
        Destinasi Wisata Desa Bojongsari
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-10 md:px-16 gap-8 pb-20 md:pb-[10rem]">
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              key={item.id}
              href={`/tours/${item.id}`}
              className="p-5 bg-white shadow-md rounded cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={560}
                  height={300}
                  quality={100}
                  className="h-[300px] w-full aspect-video rounded object-cover size-auto"
                />
                <span className="absolute z-10 -bottom-5 left-1/2 -translate-x-1/2 rounded py-2 px-5 text-lg font-semibold text-primary-80% bg-white hover:text-primary-60% shadow-md capitalize">
                  {item.name}
                </span>
              </div>
              <p className="text-lg mt-5 line-clamp-5">{item.description}</p>
            </Link>
          ))
        ) : (
          <Fragment>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[300px] w-full rounded animate-pulse bg-white"
              >
                <div className="h-20 w-1/2 bg-neutral-50% rounded"></div>
                <div className="h-5 w-1/2 bg-neutral-50% rounded mt-3"></div>
                <div className="h-5 w-full bg-neutral-50% rounded mt-3"></div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </section>
  );
};
