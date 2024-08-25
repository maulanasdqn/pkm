import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { TCardMarket } from './type';
import Link from 'next/link';

export const CardMarket: FC<TCardMarket> = (props): ReactElement => {
  return (
    <Link
      href={props.href}
      className="max-w-[327px] max-h-[425px] flex flex-col gap-4 p-3.5 rounded-xl shadow-md font-source-sans-pro transition-all duration-300 hover:scale-105"
      scroll={true}
    >
      <Image
        alt="images"
        src={props.imageUrl}
        width={500}
        height={500}
        quality={100}
        className="min-w-[300px] min-h-[300px] rounded-[4px] object-cover object-center"
      />

      <div className="flex flex-col gap-1 text-2xl font-medium">
        <p>{props.name}</p>
        <p className="text-red-80%">
          Rp. {props.price.toLocaleString('id-ID')}
        </p>
      </div>
    </Link>
  );
};
