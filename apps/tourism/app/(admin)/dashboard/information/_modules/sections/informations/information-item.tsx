import * as React from 'react';
import Image from 'next/image';
import { TInformationItemProps } from './type';
import { InformationFormTrigger } from '../information-form';
import { DeleteTrigger } from './delete-trigger';

export const InformationItem: React.FC<TInformationItemProps> = ({
  item,
}): React.ReactElement => {
  return (
    <div className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 bg-white">
      <Image
        src={item.img}
        alt={item.title}
        width={515}
        height={250}
        className="h-[150px] w-full aspect-video rounded-lg"
      />
      <div className="flex flex-col gap-3 items-center justify-center p-4">
        <h1 className="text-base text-primary-70%">
          <span>{item.location},</span>
          <span> {item.createdAt}</span>
          <span> - </span>
          <span>{item.title}</span>
        </h1>
        <div className="pt-3 border-t border-neutral-60% text-sm">
          <p className="line-clamp-4">{item.content}</p>
        </div>
      </div>
      <div className="p-4 pt-0 space-x-1">
        <InformationFormTrigger text="edit" id={item.id} />
        <DeleteTrigger />
      </div>
    </div>
  );
};
