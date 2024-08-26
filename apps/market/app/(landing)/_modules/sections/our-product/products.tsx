'use client';
import {
  CardMarket,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const ProductCarousel: FC = (): ReactElement => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full 2xl:px-16 px-4"
    >
      <CarouselPrevious className="disabled:cursor-not-allowed" />
      <CarouselContent className="py-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <CarouselItem key={i} className="basis-1/3">
            <CardMarket
              href={`/products/${i + 1}`}
              name="Kopi"
              price={15000}
              imageUrl="/images/kopi.webp"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="disabled:cursor-not-allowed" />
    </Carousel>
  );
};
