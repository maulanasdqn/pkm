import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { TCardMarket, TCardMarketAdmin } from './type';
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
        className="min-w-[300px] max-w-[300px] min-h-[300px] max-h-[300px] rounded-[4px] object-cover object-center"
      />

      <div className="flex flex-col gap-1 text-xl font-medium">
        <p>{props.name}</p>
        <p className="text-red-80%">
          Rp. {props.price.toLocaleString('id-ID')}
        </p>
      </div>
    </Link>
  );
};

export const CardMarketAdmin: FC<TCardMarketAdmin> = ({
  Icon,
  ...props
}): ReactElement => {
  return (
    <div className="min-w-[307px] max-w-[310px] max-h-[170px] flex flex-col justify-center gap-2 py-4 px-6 bg-white rounded-[10px] shadow-md">
      <Icon className="text-3xl" />
      <h4 className="text-2xl font-roboto">Total {props.name}</h4>

      <div className="flex flex-col">
        <p className="font-bold text-3xl">{props.amount}</p>
        <p className="text-primary-50% text-sm font-medium">30 hari terakhir</p>
      </div>
    </div>
  );
};
