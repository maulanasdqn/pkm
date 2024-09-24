import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { InformationDetailModuleProps } from './type';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

export const NewsDetailModule: FC<InformationDetailModuleProps> = ({
  image,
  title,
  createdAt,
  location,
  description,
  otherInformations,
}): ReactElement => {
  const date = new Date(createdAt as Date);
  const value = format(date, 'dd MMMM yyyy', { locale: id });
  return (
    <section className="container w-full flex flex-col gap-8 pt-10 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-70%">
        Informasi
      </h1>
      <div className="lg:grid grid-cols-3 gap-4">
        <div className="col-span-2 w-full flex flex-col gap-8">
          <Image
            src={image}
            alt={title}
            width={913}
            height={425}
            quality={100}
            className="w-full max-h-[425px] aspect-video rounded"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl text-primary-70%">
            <span>{location},</span>
            <span> {value}</span>
            <span> - </span>
            <span>{title}</span>
          </h2>
          <p className="text-base md:text-lg mb-10 lg:mb-0">{description}</p>
        </div>
        <aside className="flex flex-col w-full gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-primary-70%">
            Informasi Lainnya
          </h1>
          <div className="flex gap-4 flex-col sm:flex-row lg:flex-col">
            {otherInformations.length > 0 ? (
              otherInformations.map((item) => {
                const date = new Date(item.createdAt as Date);
                const value = format(date, 'dd MMMM yyyy', { locale: id });
                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={515}
                      height={200}
                      className="h-[200px] w-full aspect-video rounded-lg"
                    />
                    <div className="flex flex-col gap-3 items-center justify-center p-3">
                      <h1 className="text-xl text-primary-70%">
                        <span>{item.location},</span>
                        <span> {value}</span>
                        <span> - </span>
                        <span>{item.title}</span>
                      </h1>
                    </div>
                  </Link>
                );
              })
            ) : (
              <>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white"
                  >
                    <div className="flex flex-col gap-3 items-center justify-center p-3">
                      <div className="w-full h-[200px] animate-pulse bg-neutral-40%" />
                      <div className="w-full h-[60px] animate-pulse bg-neutral-40%" />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
