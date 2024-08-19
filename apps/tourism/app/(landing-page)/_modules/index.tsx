import { Carousel, CarouselContent, CarouselItem } from '@pkm/ui';
import Image from 'next/image';
import { FC, ReactElement } from 'react';

export const LandingPageModule: FC = (): ReactElement => {
  return (
    <>
      <section
        id="hero"
        className="relative w-full flex flex-col gap-10 pb-20 2xl:container 2xl:mx-auto font-source-sans-pro"
      >
        <Image
          src="/images/hero-img.webp"
          alt="hero"
          quality={100}
          width={1536}
          height={575}
        />

        <div className="px-14 space-y-8 container mx-auto pb-16">
          <h1 className="text-4xl font-bold text-primary-70%">
            Selamat Datang di Desa Bojongsari - Pesona Alam dan Budaya Khas
            Bandung
          </h1>
          <h2 className="text-2xl">
            Desa Bojongsari di Bandung adalah surga tersembunyi yang menawarkan
            kombinasi sempurna antara keindahan alam yang menakjubkan dan budaya
            Sunda yang masih terjaga. Dikelilingi oleh perbukitan hijau dan
            danau yang indah, desa ini memberikan suasana yang damai dan
            menenangkan, jauh dari hiruk-pikuk kota.
          </h2>
        </div>
      </section>
      <section className="w-full h-full relative 2xl:container 2xl:mx-auto font-source-sans-pro">
        <Image
          src="/images/bg-grass.webp"
          alt="grass-bg"
          width={1536}
          height={295}
          className="absolute bottom-0 left-0"
        />
        <div className="container mx-auto pb-16">
          <h1 className="px-14 mb-8 text-4xl font-semibold text-primary-70%">
            Destinasi Desa Wisata
          </h1>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
            showDotNavigator
            className="w-full max-w-full"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <div className="p-1">
                    <div className="p-4 border-2 bg-white">
                      <div className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
      <section className="w-full h-full font-source-sans-pro my-16">
        <div className="container mx-auto pb-16">
          <h1 className="px-14 mb-8 text-4xl font-semibold text-primary-70%">
            Informasi Tentang Wisata Desa
          </h1>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <div className="p-1">
                    <div className="p-4 border-2 bg-white">
                      <div className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </>
  );
};
