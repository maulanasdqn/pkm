'use client';
import { FC, ReactElement } from 'react';
import { TCardCart } from './type';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { CheckBox } from '../../atoms/inputs/checkbox';

export const CardCart: FC<TCardCart> = ({
  imageUrl,
  price,
  amount,
  onDelete,
  ...props
}): ReactElement => {
  return (
    <label
      htmlFor={props.name}
      className="w-full pl-5 pr-12 py-6 flex items-center justify-between min-h-[266px] max-h-[266px] font-source-sans-pro bg-neutral-10% rounded-lg shadow-md transition-all duration-300 hover:bg-neutral-30%"
    >
      <div className="flex gap-10 items-center">
        <CheckBox {...props} />

        <Image
          alt="images"
          src={imageUrl}
          width={500}
          height={500}
          quality={100}
          className="min-w-[244px] max-w-[244px] min-h-[188px] max-h-[188px] rounded-[4px] object-cover object-center"
        />

        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold">Kopi</p>
          <p className="text-2xl">200 gram</p>
        </div>
      </div>

      <div className="py-1.5 w-full max-w-[111px] text-center rounded-sm text-xl border">
        {amount}
      </div>

      <p className="text-2xl">Rp.{price.toLocaleString('id-ID')}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(e);
        }}
      >
        <DeleteOutlined className="text-2xl" />
      </button>
    </label>
  );
};
