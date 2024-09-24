import * as React from 'react';
import Image from 'next/image';
import { TInformationItemProps } from './type';
import { InformationFormTrigger } from '../information-form';
import { DeleteTrigger } from './delete-trigger';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

export const InformationItem: React.FC<TInformationItemProps> = ({
  item,
}): React.ReactElement => {
  if (!item) {
    return (
      <>
        <div className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 bg-white">
          <div className="flex flex-col gap-3 items-center justify-center p-4">
            <h1 className="text-base text-primary-70%">
              <span>Belum ada informasi</span>
            </h1>
          </div>
        </div>
      </>
    );
  }
  const date = new Date(item?.createdAt as Date);
  const value = format(date, 'dd MMMM yyyy', { locale: id });
  return (
    <div className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 bg-white">
      <Image
        src={item.image}
        alt={item.title}
        width={515}
        height={250}
        className="h-[150px] w-full aspect-video rounded-lg"
      />
      <div className="flex flex-col gap-3 items-center justify-center p-4">
        <h1 className="text-base text-primary-70%">
          <span>{item.location},</span>
          <span> {value}</span>
          <span> - </span>
          <span>{item.title}</span>
        </h1>
        <div className="pt-3 border-t border-neutral-60% text-sm w-full">
          <p className="line-clamp-4">{item.description}</p>
        </div>
      </div>
      <div className="p-4 pt-0 space-x-1">
        <InformationFormTrigger text="edit" id={item.id} />
        <DeleteTrigger id={item.id} />
      </div>
    </div>
  );
};

export const InformationItemSkeleton: React.FC = (): React.ReactElement => {
  return (
    <div className="animate-pulse border border-neutral-30% rounded-lg shadow-md flex flex-col gap-3 bg-white">
      <div className="h-[150px] w-full bg-neutral-30% rounded-lg"></div>
      <div className="flex flex-col gap-3 items-center justify-center p-4">
        <div className="h-5 w-1/2 bg-neutral-30% rounded-lg"></div>
        <div className="h-5 w-3/4 bg-neutral-30% rounded-lg"></div>
        <div className="h-5 w-1/2 bg-neutral-30% rounded-lg"></div>
      </div>
      <div className="p-4 pt-0 space-x-1">
        <div className="bg-neutral-30% rounded-lg w-1/2 h-8"></div>
        <div className="bg-neutral-30% rounded-lg w-1/2 h-8"></div>
      </div>
    </div>
  );
};
