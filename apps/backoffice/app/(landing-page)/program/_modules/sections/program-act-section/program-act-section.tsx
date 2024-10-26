import * as React from 'react';
import Image from 'next/image';
import { dataPrograms } from '@pkm/libs/entities';
import Link from 'next/link';

export const ProgramActSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-14 space-y-14 container flex flex-col items-center">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-primary">
        Bidang Program Kegiatan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {dataPrograms.map(({ title, imgSrc, slug }) => (
          <Link
            key={imgSrc}
            href={`/program/${slug}`}
            className="w-full flex flex-col justify-center items-center py-8 px-6 gap-4 rounded bg-primary text-white"
          >
            <Image
              src={imgSrc}
              alt={title}
              width={100}
              height={100}
              className="size-[90px] object-fit"
            />
            <h1 className="text-lg md:text-xl text-center font-semibold">
              {title}
            </h1>
          </Link>
        ))}
      </div>
    </section>
  );
};
