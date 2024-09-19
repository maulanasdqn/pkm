import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { TDestinationSchema } from '@pkm/libs/entities';

interface TToursPageModuleProps {
  data: TDestinationSchema[];
}

export const ToursPageModule: FC<TToursPageModuleProps> = ({
  data,
}): ReactElement => {
  return (
    <section className="min-h-screen relative w-full flex flex-col items-center">
      <Image
        src="/images/bg-lake.webp"
        alt="bg-lake"
        width={1536}
        height={600}
        quality={100}
        className="h-[600px] absolute top-0 -z-10"
      />
      <h1 className="text-4xl font-bold text-white py-40">
        Destinasi Wisata Desa Bojongsari
      </h1>
      <div className="grid grid-cols-2 container mx-auto px-16 gap-8 pb-[10rem]">
        {data ? (
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
                  className="h-[300px] w-full aspect-video rounded"
                />
                <span className="absolute z-10 -bottom-5 left-1/2 -translate-x-1/2 rounded py-2 px-5 text-lg font-semibold text-primary-80% bg-white hover:text-primary-60% shadow-md capitalize">
                  {item.name}
                </span>
              </div>
              <p className="text-lg mt-5 line-clamp-5">{item.description}</p>
            </Link>
          ))
        ) : (
          <div className="h-[300px] w-full rounded">
            <p>Data tidak ditemukan! silahkan coba lagi</p>
            <Link href="/">Kembali ke beranda</Link>
          </div>
        )}
      </div>
    </section>
  );
};
