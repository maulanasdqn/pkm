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
      className={`relative w-full min-h-[627px] max-h-[627px] bg-cover bg-center`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className={cn(
          'w-full min-h-[627px] max-h-[627px] flex flex-col items-center justify-center bg-black bg-opacity-50 text-white font-source-sans-pro',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
