import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactElement } from 'react';
import type { TControlledSelect, TSelect, TSelectOption } from './type';
import { cn } from '@pkm/libs/clsx';
import { FieldValues, useController } from 'react-hook-form';

const selectClassName = cva(
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

const selectChevronClassName = cva(
  'after:content-[""] after:absolute after:right-4  after:border-x-transparent after:top-1/2 after:-translate-y-1/2 after:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'after:border-t-black',
        success: 'after:border-t-primary-50%',
        info: 'after:border-t-blue-80%',
        error: 'after:border-t-red-60%',
      },

      dimension: {
        md: 'after:border-l-[0.3rem] after:border-r-[0.3rem] after:border-t-[0.3rem]',
        lg: 'after:border-l-[0.4rem] after:border-r-[0.4rem] after:border-t-[0.4rem]',
      },
    },

    defaultVariants: {
      variant: 'default',
      dimension: 'lg',
    },
  }
);

export const Select: FC<TSelect & VariantProps<typeof selectClassName>> = ({
  variant,
  dimension,
  errorMessage,
  className,
  ...props
}): ReactElement => {
  return (
    <>
      <div
        className={cn(
          'inline-flex flex-col gap-1.5 font-montserrat relative',
          selectChevronClassName({ variant, dimension })
        )}
      >
        <select
          {...props}
          className={cn(
            'appearance-none w-full',
            selectClassName({ variant, dimension }),
            className
          )}
        >
          <option value="">{props.placeholder}</option>
          {props.children}
        </select>
      </div>
      {errorMessage && variant === 'error' && (
        <p className="text-red-50% text-[10px]">{errorMessage}</p>
      )}
    </>
  );
};

export const SelectOption: FC<TSelectOption> = ({
  value,
  children,
  ...props
}): ReactElement => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};

export const ControlledSelect = <T extends FieldValues>({
  ...props
}: TControlledSelect<T> &
  VariantProps<typeof selectClassName>): ReactElement => {
  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return <Select {...{ ...props, ...field }}>{props.children}</Select>;
};
