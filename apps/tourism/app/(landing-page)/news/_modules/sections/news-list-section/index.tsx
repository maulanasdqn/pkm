'use client';
import { getAllInformations } from '@pkm/libs/actions/tourism';
import { cn } from '@pkm/libs/clsx';
import { TInformationSchema } from '@pkm/libs/entities';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactElement, useEffect, useState } from 'react';

export const NewsListSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  const [data, setData] = useState<TInformationSchema[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const destinations = await getAllInformations();

      if (destinations.status.ok) {
        setData(destinations.data);
      }
    };
    fetchData();
  }, []);
  return (
    <section
      className={cn(
        'container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6',
        className
      )}
    >
      {data.length > 0 ? (
        data.map((item) => {
          const date = new Date(item?.createdAt as Date);
          const value = format(date, 'dd MMMM yyyy', { locale: id });
          return (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              title={item.title}
              className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all duration-500 bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={515}
                height={250}
                className="h-[250px] w-full aspect-video rounded-lg"
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
            </Link>
          );
        })
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white"
            >
              <div className="h-[250px] w-full aspect-video rounded-lg animate-pulse bg-neutral-50%" />
              <div className="flex flex-col gap-3 items-center justify-center p-6">
                <div className="h-[100px] bg-neutral-50% animate-pulse" />
                <div className="pt-3 border-t border-neutral-60% text-lg">
                  <p className="line-clamp-4">-</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
};
