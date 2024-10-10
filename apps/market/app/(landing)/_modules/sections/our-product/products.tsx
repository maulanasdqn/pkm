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
import { TOurProductsModule } from './types';

export const ProductCarousel: FC<TOurProductsModule> = ({
  products,
}): ReactElement => {
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
        {products?.map((item, i) => (
          <CarouselItem key={i} className="basis-1/3">
            <CardMarket
              href={`/products/${item?.id}`}
              name={item?.name}
              price={item?.price}
              imageUrl={item?.image}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="disabled:cursor-not-allowed" />
    </Carousel>
  );
};
