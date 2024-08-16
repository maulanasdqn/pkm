'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactElement } from 'react';
import type { TControlledTextarea, TTextArea } from './type';
import { cn } from '@pkm/libs/clsx';
import { FieldValues, useController } from 'react-hook-form';

const textareaClassName = cva(
  'w-full border px-4 py-2.5 rounded-[4px] focus:outline-none font-medium disabled:cursor-not-allowed disabled:border-neutral-60% disabled:text-neutral-50% disabled:bg-neutral-10% disabled:placeholder:text-neutral-50%',
  {
    variants: {
      variant: {
        default: 'border-neutral-60% placeholder:text-neutral-60%',
        success: 'bg-white border-primary-50% text-neutral-70%',
        info: 'bg-white border-blue-80% text-neutral-80%',
        error: 'bg-white border-red-60% text-red-50% placeholder:text-red-50%',
      },

      dimension: {
        md: 'text-[10px] py-2',
        lg: 'text-[13px]',
      },
    },

    defaultVariants: {
      variant: 'default',
      dimension: 'lg',
    },
  }
);

export const Textarea: FC<
  TTextArea & VariantProps<typeof textareaClassName>
> = ({ variant, dimension, errorMessage, ...props }): ReactElement => {
  return (
    <div className="flex flex-col gap-1.5">
      <textarea
        {...props}
        className={cn(textareaClassName({ variant, dimension }))}
      ></textarea>
      {errorMessage && variant === 'error' && (
        <p className="text-red-50% text-[10px]">{errorMessage}</p>
      )}
    </div>
  );
};

export const ControlledTextarea = <T extends FieldValues>({
  ...props
}: TControlledTextarea<T> &
  VariantProps<typeof textareaClassName>): ReactElement => {
  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return <Textarea {...{ ...props, ...field }} />;
};
