'use client';
import { FC, Fragment, ReactElement } from 'react';
import { TCheckBox, TControlledCheckBox } from './type';
import { cn } from '@pkm/libs/clsx';
import { cva, VariantProps } from 'class-variance-authority';
import { type FieldValues, useController } from 'react-hook-form';

const checkboxClassName = cva(
  'size-8 rounded-full border-2 peer-checked:bg-black transition-all duration-200 peer-disabled:cursor-not-allowed peer-disabled:bg-neutral-30% peer-disabled:border-neutral-60%',
  {
    variants: {
      shape: {
        round: 'rounded-full',
        square: 'rounded-[5px] border',
      },

      size: {
        sm: 'size-5',
        md: 'size-8',
        lg: 'size-10',
      },
    },

    defaultVariants: {
      shape: 'round',
      size: 'md',
    },
  }
);
export const CheckBox: FC<
  TCheckBox & VariantProps<typeof checkboxClassName>
> = ({ name, shape, size, className, ...props }): ReactElement => {
  return (
    <Fragment>
      <input
        type="checkbox"
        className="appearance-none peer hidden"
        id={name}
        name={name}
        {...props}
      />

      <label
        className={cn(checkboxClassName({ shape, size }), className)}
        htmlFor={name}
      ></label>
    </Fragment>
  );
};

export const ControlledCheckBox = <T extends FieldValues>({
  ...props
}: TControlledCheckBox<T> & VariantProps<typeof checkboxClassName>) => {
  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return <CheckBox {...{ ...props, ...field }} />;
};
