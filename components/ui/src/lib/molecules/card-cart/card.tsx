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
      className="w-full lg:pl-5 lg:pr-12 py-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-0 justify-between min-h-[266px] lg:max-h-[266px] font-source-sans-pro bg-neutral-10% rounded-lg shadow-md transition-all duration-300 hover:bg-neutral-30%"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-center px-4 lg:px-0">
        <CheckBox {...props} />

        <Image
          alt="images"
          src={imageUrl}
          width={500}
          height={500}
          quality={100}
          className="min-w-[100px] max-w-[100px] lg:min-w-[244px] lg:max-w-[244px] lg:min-h-[188px] lg:max-h-[188px] rounded-[4px] object-cover object-center"
        />

        <p className="text-base lg:text-2xl font-bold lg:max-w-[8rem]">
          {props.name}
        </p>
      </div>

      <div className="py-1 lg:py-1.5 w-full max-w-[111px] text-center rounded-sm text-base lg:text-xl border">
        {amount}
      </div>

      <p className="text-lg lg:text-2xl">Rp.{price.toLocaleString('id-ID')}</p>

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
