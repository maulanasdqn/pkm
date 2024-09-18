import { MailFilled, PhoneFilled } from '@ant-design/icons';
import { Button, Carousel, CarouselContent, CarouselItem } from '@pkm/ui';
import Image from 'next/image';
import React, { FC, ReactElement } from 'react';
import { TTourDetailProps } from './type';

export const TourDetailModule: FC<TTourDetailProps> = ({
  id,
  images,
  description,
  name,
}): ReactElement => {
  return (
    <section className="container mx-auto my-10 space-y-7">
      <h1 className="text-4xl font-bold text-primary-70%">{name}</h1>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        imgThumbnail={images}
        showThumbnail
        className="w-full max-w-full"
      >
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="p-5">
                <Image
                  src={item}
                  alt={item}
                  width={1440}
                  height={450}
                  quality={100}
                  className="h-[450px] w-full aspect-video rounded"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <p className="text-lg">{description}</p>
        </div>
        <aside className="rounded border border-neutral-60% flex flex-col gap-3 p-4 space-y-8">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl">Reservasi Sekarang</h1>
            <Button
              href={`/reservation/${id}`}
              title="reservasi tiket"
              size="lg"
            >
              Pesan Reservasi
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center border-t border-neutral-60% py-5">
            <h1 className="text-2xl mb-5">Kontak Desa Wisata</h1>
            <div className="w-full grid grid-cols-4 gap-2">
              <div className="text-lg relative">
                <PhoneFilled className="absolute right-3 top-1" />
              </div>
              <div className="text-neutral-80% space-x-1 col-span-3">
                <span>:</span>
                <span>081213294384</span>
              </div>
              <div className="text-lg relative">
                <MailFilled className="absolute right-3 top-1" />
              </div>
              <div className="text-neutral-80% space-x-1 col-span-3">
                <span>:</span>
                <span>info@wisatabojongsari.id</span>
              </div>
              <div className="text-lg relative">
                <Image
                  src="/icons/map-icon.svg"
                  alt="map"
                  width={18}
                  height={18}
                  className="size-4 absolute right-3 top-1"
                />
              </div>
              <div className="text-neutral-80% space-x-1 col-span-3">
                <span>:</span>
                <span>
                  Jln. Bojongsari No.70 Kec. Bojongsoang Kab. Bandung, Jawa
                  Barat
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
