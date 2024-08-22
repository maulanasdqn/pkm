import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { cn } from '@pkm/libs/clsx';

export const VisiMisiSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section
      className={cn('w-full flex flex-col container mx-auto px-20', className)}
    >
      <div className="grid grid-cols-3 place-items-center gap-10">
        <Image
          src="/images/visi.webp"
          alt="visi"
          width={250}
          height={250}
          className="aspect-square"
        />
        <div className="col-span-2 w-full flex flex-col gap-4 text-center">
          <h2 className="text-3xl">Visi</h2>
          <p className="text-xl">
            Menjadikan Desa Bojongsari sebagai destinasi wisata unggulan yang
            menawarkan pengalaman otentik, berkelanjutan, dan berbudaya, serta
            mendukung kesejahteraan masyarakat lokal melalui pariwisata yang
            ramah lingkungan dan inklusif.
          </p>
        </div>
        <div className="col-span-2 w-full flex flex-col gap-4 text-center">
          <h2 className="text-3xl">Misi</h2>
          <p className="text-xl">
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
