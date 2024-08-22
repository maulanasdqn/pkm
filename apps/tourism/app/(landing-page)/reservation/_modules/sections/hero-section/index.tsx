import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { cn } from '@pkm/libs/clsx';

export const HeroSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <section
      className={cn(
        'w-full flex flex-col 2xl:container 2xl:mx-auto',
        className
      )}
    >
      <div className="relative">
        <Image
          src="/images/heroImg.webp"
          alt="reservation page"
          width={1536}
          height={370}
          className="aspect-auto max-h-[350px]"
        />
        <div className="absolute z-10 bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center text-center gap-8 text-white">
          <h1 className="text-4xl font-bold">Cek Reservasi</h1>
        </div>
      </div>
    </section>
  );
};
