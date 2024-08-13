'use client';

import { FC, ReactElement, useState } from 'react';
import { TControlledTextField, TTextField } from './type';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@pkm/libs/clsx';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { FieldValues, useController } from 'react-hook-form';

const textfieldClassName = cva(
  'w-full border px-4 py-2.5 rounded-[4px] focus:outline-none font-medium disabled:cursor-not-allowed disabled:border-neutral-60% disabled:text-neutral-50% disabled:bg-neutral-10% disabled:placeholder:text-neutral-50%',
  {
    variants: {
      variant: {
        default: 'border-neutral-60% placeholder:text-neutral-60% ',
        success: 'bg-white border-primary-50% text-neutral-70%',
        info: 'bg-white border-blue-80% text-neutral-80%',
        error: 'bg-white border-red-60% text-red-50% placeholder:text-red-50%',
      },

      dimension: {
        sm: 'text-[10px] py-2',
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

export const TextField: FC<
  TTextField & VariantProps<typeof textfieldClassName>
> = ({
  type = 'text',
  variant,
  dimension,
  errorMessage,
  ...props
}): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const eyeClassName = cn('text-neutral-60%', {
    'text-neutral-50% cursor-not-allowed': props.disabled,
    'text-red-50%': variant === 'error' && !props.disabled,
    'text-neutral-80%': variant === 'info' && !props.disabled,
    'text-primary-70%': variant === 'success' && !props.disabled,
  });

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          {...props}
          className={cn(textfieldClassName({ variant, dimension }))}
        />

        {type === 'password' && (
          <button
            title="Password Visibility"
            type="button"
            disabled={props.disabled}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeInvisibleFilled className={eyeClassName} />
            ) : (
              <EyeFilled className={eyeClassName} />
            )}
          </button>
        )}
      </div>

      {errorMessage && variant === 'error' && (
        <p className={'text-red-50% text-[10px]'}>{errorMessage}</p>
      )}
    </div>
  );
};

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
