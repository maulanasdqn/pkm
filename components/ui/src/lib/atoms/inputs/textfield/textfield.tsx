'use client';

import { forwardRef, ReactElement, useState } from 'react';
import { TControlledTextField, TTextFieldProps } from './type';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@pkm/libs/clsx';
import {
  EyeFilled,
  EyeInvisibleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { FieldValues, useController } from 'react-hook-form';

export const textfieldClassName = cva(
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

export const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  (
    { type = 'text', variant, dimension, errorMessage, ...props },
    ref
  ): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const iconClassName = cn('text-neutral-60%', {
      'text-neutral-50% cursor-not-allowed': props.disabled,
      'text-red-50%': variant === 'error' && !props.disabled,
      'text-neutral-80%': variant === 'info' && !props.disabled,
      'text-primary-70%': variant === 'success' && !props.disabled,
    });

    return (
      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : type}
            {...props}
            className={cn(textfieldClassName({ variant, dimension }), {
              'pr-10': type === 'password',
              'pl-12': type === 'search',
            })}
          />

          {type === 'search' && (
            <SearchOutlined
              className={cn(
                'absolute left-4 transform -translate-y-1/2 top-1/2',
                iconClassName
              )}
            />
          )}

          {type === 'password' && (
            <button
              title="Password Visibility"
              type="button"
              disabled={props.disabled}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeInvisibleFilled className={iconClassName} />
              ) : (
                <EyeFilled className={iconClassName} />
              )}
            </button>
          )}
        </div>

        {errorMessage && variant === 'error' && (
          <p className={'text-red-50% text-[10px]'}>{errorMessage}</p>
        )}
      </div>
    );
  }
);

export const ControlledTextField = <T extends FieldValues>({
  ...props
}: TControlledTextField<T> &
  VariantProps<typeof textfieldClassName>): ReactElement => {
  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return <TextField {...{ ...props, ...field }} />;
};
