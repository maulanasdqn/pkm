'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  CarouselApi,
  CarouselContextProps,
  CarouselProps,
  DotPropType,
} from './type';
import { cn } from '@pkm/libs/clsx';
import { EmblaCarouselType } from 'embla-carousel';
import { Button } from '../button';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      showDotNavigator = false,
      showThumbnail = false,
      imgThumbnail,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );
    const [carouselThumbsRef, carouselThumbsApi] = useEmblaCarousel({
      containScroll: 'keepSnaps',
      dragFree: true,
    });

    const onThumbClick = React.useCallback(
      (index: number) => {
        if (!api || !carouselThumbsApi) return;
        api.scrollTo(index);
      },
      [api, carouselThumbsApi]
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const { selectedIndex, scrollSnaps, onDotButtonClick, setSelectedIndex } =
      useDotButton(api);

    const onSelectThumb = React.useCallback(() => {
      if (!api || !carouselThumbsApi) return;
      setSelectedIndex(api.selectedScrollSnap());
      api.scrollTo(api.selectedScrollSnap());
    }, [api, carouselThumbsApi, setSelectedIndex]);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelectThumb();
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect, onSelectThumb]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
          {showDotNavigator && (
            <div className="flex flex-wrap justify-center items-center gap-1 mt-3">
              {scrollSnaps.map((_, index) => (
                <CarouselDot
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={cn(
                    'rounded-full size-2.5 inline-flex items-center justify-center cursor-pointer shadow border border-neutral-60%',
                    index === selectedIndex ? 'bg-primary' : 'bg-white'
                  )}
                />
              ))}
            </div>
          )}
          {showThumbnail && imgThumbnail && (
            <div className="mt-3">
              <div
                ref={carouselThumbsRef}
                className="overflow-hidden border-y border-neutral-60%"
              >
                <div className="flex w-full justify-start">
                  {imgThumbnail.map((item, index) => (
                    <button
                      key={index}
                      className="px-2 sm:px-0 py-1 min-w-0 shrink-0 grow-0 sr-only sm:not-sr-only basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      onClick={() => onThumbClick(index)}
                    >
                      <div className="p-3 px-2 w-full">
                        <Image
                          src={item}
                          alt={`thumbnail-${index + 1}`}
                          width={250}
                          height={150}
                          quality={100}
                          className={cn(
                            'h-[150px] w-full aspect-video rounded ring object-cover',
                            index === selectedIndex
                              ? 'ring-primary-90%'
                              : 'ring-neutral-60%'
                          )}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const useDotButton = (emblaApi: CarouselApi): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
    setSelectedIndex,
  };
};

const CarouselDot: React.FC<DotPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        'absolute h-8 w-8 rounded-full inline-flex justify-center items-center border border-neutral-60% disabled:border-neutral disabled:text-neutral-60%',
        orientation === 'horizontal'
          ? '-left-10 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftOutlined />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        'absolute h-8 w-8 rounded-full inline-flex justify-center items-center border border-neutral-60% disabled:border-neutral disabled:text-neutral-60%',
        orientation === 'horizontal'
          ? '-right-10 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightOutlined />
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDot,
  CarouselNext,
  CarouselPrevious,
};
