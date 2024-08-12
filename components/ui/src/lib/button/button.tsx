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

const btnClassName = cva(className, {
  variants: {
    variant: {
      primary:
        'bg-primary hover:bg-primary-60% active:bg-primary-80% focus:bg-primary-60% text-white',
      secondary:
        'border border-primary bg-transparent hover:bg-primary-20% active:bg-primary-40% focus:bg-primary-20% text-primary',
      text: 'text-primary hover:text-primary-60% active:text-primary-80% focus:text-primary-60%',
      yellowPrimary:
        'bg-secondary hover:bg-secondary-60% active:bg-secondary-80% focus:bg-secondary-60% text-white',
      yellowSecondary:
        'border border-secondary bg-transparent hover:bg-secondary-20% active:bg-secondary-40% focus:bg-secondary-20% text-secondary-60%',
      yellowText:
        'text-secondary-60% hover:text-secondary-80% active:text-secondary-90% focus:text-secondary-80%',
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
  ...props
}): ReactElement => {
  return match(href)
    .with(P.string, (link) => (
      <Link href={link}>
        <button
          className={cn(btnClassName({ variant, className, size }))}
          {...props}
        >
          {props.children}
        </button>
      </Link>
    ))
    .otherwise(() => (
      <button
        className={cn(btnClassName({ variant, className, size }))}
        {...props}
      >
        {props.children}
      </button>
    ));
};
