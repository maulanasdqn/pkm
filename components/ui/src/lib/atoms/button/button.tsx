import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@pkm/libs/clsx';
import { TButton } from './type';
import { P, match } from 'ts-pattern';

const size = {
  sm: 'text-xs h-9 px-3',
  md: 'text-sm h-10 px-5',
  lg: 'text-base h-11 px-7',
  icon: 'h-10 w-10',
};

const className =
  'inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const primaryVariantColors = {
  secondary:
    'data-[color=secondary]:bg-secondary data-[color=secondary]:hover:bg-secondary-60% data-[color=secondary]:active:bg-secondary-70% data-[color=secondary]:focus:bg-secondary-60% data-[color=secondary]:text-white',

  red: 'data-[color=red]:bg-red data-[color=red]:hover:bg-red-60% data-[color=red]:active:bg-red-70% data-[color=red]:focus:bg-red-60%',
};

const secondaryVariantColors = {
  secondary:
    'data-[color=secondary]:border-secondary data-[color=secondary]:hover:bg-secondary-20% data-[color=secondary]:active:bg-secondary-40% data-[color=secondary]:focus:bg-secondary-20% data-[color=secondary]:text-secondary-60%',

  red: 'data-[color=red]:text-red data-[color=red]:border-red-50% data-[color=red]:hover:bg-red-20% data-[color=red]:active:bg-red-40% data-[color=red]:focus:bg-red-20%',

  black:
    'data-[color=black]:text-black data-[color=black]:border-black data-[color=black]:hover:bg-neutral-20% data-[color=black]:active:bg-neutral-40% data-[color=black]:focus:bg-neutral-20%',
};

const textVariantColors = {
  black:
    'data-[color=black]:text-black data-[color=black]:hover:text-neutral-90% data-[color=black]:active:text-neutral-70% data-[color=black]:focus:text-neutral-80%',
};

const btnClassName = cva(className, {
  variants: {
    variant: {
      primary: `bg-primary hover:bg-primary-60% active:bg-primary-80% focus:bg-primary-60% text-white ${primaryVariantColors.secondary} ${primaryVariantColors.red}`,
      secondary: `border border-primary bg-transparent hover:bg-primary-20% active:bg-primary-40% focus:bg-primary-20% text-primary ${secondaryVariantColors.secondary} ${secondaryVariantColors.red} ${secondaryVariantColors.black}`,

      text: `text-primary hover:text-primary-60% active:text-primary-70% focus:text-primary-60% data-[color=secondary]:text-secondary-60% data-[color=secondary]:hover:text-secondary-70% data-[color=secondary]:active:text-secondary-80% data-[color=secondary]:focus:text-secondary-70% ${textVariantColors.black}`,
    },
    size,
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const Button: FC<TButton & VariantProps<typeof btnClassName>> = ({
  size,
  className,
  href,
  variant,
  color = 'primary',
  isLoading,
  ...props
}): ReactElement => {
  const btnLoading = {
    'bg-neutral-40% text-neutral-80% animate-pulse cursor-wait hover:bg-neutral-50% active:bg-neutral-60% focus:bg-neutral-50%':
      isLoading,
  };
  return match(href)
    .with(P.string, (link) => (
      <Link href={link}>
        <button
          data-color={color}
          className={cn(btnClassName({ variant, className, size }), btnLoading)}
          {...props}
        >
          {props.children}
        </button>
      </Link>
    ))
    .otherwise(() => (
      <button
        data-color={color}
        className={cn(btnClassName({ variant, className, size }), btnLoading)}
        {...props}
      >
        {props.children}
      </button>
    ));
};
