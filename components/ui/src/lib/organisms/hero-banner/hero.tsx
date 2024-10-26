import { FC, ReactElement } from 'react';
import { THeroMarket } from './type';
import { cn } from '@pkm/libs/clsx';

export const HeroMarket: FC<THeroMarket> = ({
  children,
  className,
  imageUrl,
}): ReactElement => {
  return (
    <div
      className={`relative w-full md:min-h-[627px] md:max-h-[627px] min-h-[400px] max-h-[400px] bg-cover bg-center`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className={cn(
          'w-full md:min-h-[627px] md:max-h-[627px] min-h-[400px] max-h-[400px] flex flex-col items-center justify-center bg-black bg-opacity-60 text-white font-source-sans-pro',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
