import Image from 'next/image';
import type { FC, ReactElement } from 'react';

export const HeroSection: FC = (): ReactElement => {
  return (
    <section
      id="hero"
      className="w-full flex flex-col gap-10 pb-20 2xl:container 2xl:mx-auto font-source-sans-pro"
    >
      <Image
        src="/images/hero-img.webp"
        alt="hero"
        quality={100}
        width={1536}
        height={575}
      />

      <div className="px-14 space-y-8 container mx-auto py-16">
        <h1 className="text-4xl font-bold text-primary-70%">
          Selamat Datang di Desa Bojongsari - Pesona Alam dan Budaya Khas
          Bandung
        </h1>
        <h2 className="text-2xl">
          Desa Bojongsari di Bandung adalah surga tersembunyi yang menawarkan
          kombinasi sempurna antara keindahan alam yang menakjubkan dan budaya
          Sunda yang masih terjaga. Dikelilingi oleh perbukitan hijau dan danau
          yang indah, desa ini memberikan suasana yang damai dan menenangkan,
          jauh dari hiruk-pikuk kota.
        </h2>
      </div>
    </section>
  );
};
