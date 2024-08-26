import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { TDashboardHeaderProps } from './type';
import { cn } from '@pkm/libs/clsx';

export const DashboardHeader: FC<TDashboardHeaderProps> = ({
  imgSrc,
  title,
  imgClassName,
}): ReactElement => {
  return (
    <div className="w-full px-24 max-h-72 rounded-bl-[90px] bg-primary-80%">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl border-l-4 px-5 py-4 max-w-14 capitalize text-white border-white">
          {title}
        </h1>
        <Image
          src={imgSrc}
          alt={title}
          width={411}
          height={273}
          className={cn(
            'aspect-video min-h-[17rem] max-w-[400px] shrink-0',
            imgClassName
          )}
        />
      </div>
    </div>
  );
};
