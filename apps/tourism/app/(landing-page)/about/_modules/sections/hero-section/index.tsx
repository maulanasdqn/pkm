import { cn } from '@pkm/libs/clsx';
import Image from 'next/image';
import { FC, ReactElement } from 'react';

export const HeroSection: FC<{
  className?: string;
}> = ({ className }): ReactElement => {
  return (
    <section
      className={cn(
        'w-full flex flex-col 2xl:container 2xl:mx-auto',
        className
      )}
    >
      <div className="relative">
        <Image
          src="/images/about-bg.webp"
          alt="about page"
          width={1536}
          height={575}
          className="min-h-[50dvh] aspect-auto"
        />
        <div className="absolute w-full container z-10 top-1/3 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center text-center gap-4 md:gap-8 text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Tentang Kami
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
            Kami hadir untuk memajukan pariwisata desa melalui digitalisasi.
            Dengan platform ini, kami membantu memperluas akses wisatawan,
            meningkatkan kunjungan, dan memperkenalkan keunikan serta daya tarik
            desa kepada khalayak yang lebih luas.
          </p>
        </div>
      </div>
    </section>
  );
};
