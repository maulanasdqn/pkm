import * as React from 'react';
import { TDataProgram } from '@pkm/libs/entities';
import Image from 'next/image';

export const DetailProgramModule: React.FC<{ dataProgram: TDataProgram }> = ({
  dataProgram,
}): React.ReactElement => {
  return (
    <section className="space-y-8 md:space-y-14">
      <div className="bg-primary flex flex-col items-center justify-center gap-3 h-[300px]">
        <Image
          src={dataProgram.imgSrc}
          alt={dataProgram.slug}
          height={90}
          width={90}
          className="object-fit size-[90px]"
          priority
        />
        <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-bold">
          {dataProgram.title}
        </h1>
      </div>
      <div className="w-full container space-y-6 md:space-y-8 pb-14">
        {dataProgram.data.map(({ title, desc }, index) => (
          <div
            key={index}
            className="space-y-4 bg-white shadow-md rounded text-center"
          >
            <div className="py-3 bg-primary-70% rounded">
              <h1 className="capitalize text-white font-medium">{title}</h1>
            </div>
            <div className="px-5 sm:px-10 md:px-20 pt-3 pb-6">
              <p className="text-center text-sm sm:text-base md:text-lg">
                {desc}
              </p>
              <p className="text-center inline-flex flex-col text-sm sm:text-base md:text-lg">
                <span>Tahun pelaksanaan</span>
                <strong>2024</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
