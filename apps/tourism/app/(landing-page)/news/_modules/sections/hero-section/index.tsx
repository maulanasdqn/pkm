import { cn } from '@pkm/libs/clsx';
import Image from 'next/image';
import { FC, ReactElement } from 'react';

export const HeroSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section
      className={cn(
        'w-full flex flex-col 2xl:container 2xl:mx-auto font-source-sans-pro',
        className
      )}
    >
      <div className="relative w-full">
        <Image
          src="/images/green-mountain.webp"
          alt="green mountain"
          width={1536}
          height={575}
          className="w-full min-h-[300px] h-full object-cover"
        />
        <h1 className="container w-full text-center absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          Informasi Tentang Wisata Desa Bojongsari
        </h1>
      </div>
    </section>
  );
};
