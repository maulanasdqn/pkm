import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { cn } from '@pkm/libs/clsx';

export const VisiMisiSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section
      className={cn('w-full flex flex-col container lg:px-20', className)}
    >
      <div className="grid grid-cols-3 place-items-center gap-7 lg:gap-10">
        <Image
          src="/images/visi.webp"
          alt="visi"
          width={250}
          height={250}
          className="aspect-square"
        />
        <div className="col-span-2 w-full flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold">
            Visi
          </h2>
          <p className="text-base md:text-xl text-left">
            Menjadikan Desa Bojongsari sebagai destinasi wisata unggulan yang
            menawarkan pengalaman otentik, berkelanjutan, dan berbudaya, serta
            mendukung kesejahteraan masyarakat lokal melalui pariwisata yang
            ramah lingkungan dan inklusif.
          </p>
        </div>
        <div className="col-span-2 w-full flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold">
            Misi
          </h2>
          <p className="text-base md:text-xl text-left">
            Misi kami adalah mempromosikan keindahan dan keunikan desa melalui
            pariwisata berkelanjutan yang memberdayakan masyarakat lokal dan
            melestarikan warisan budaya serta lingkungan.
          </p>
        </div>
        <Image
          src="/images/misi.webp"
          alt="misi"
          width={250}
          height={250}
          className="aspect-square"
        />
      </div>
    </section>
  );
};
