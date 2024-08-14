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
        'bg-primary hover:bg-primary-60% active:bg-primary-80% focus:bg-primary-60% text-white data-[color=secondary]:bg-secondary data-[color=secondary]:hover:bg-secondary-60% data-[color=secondary]:active:bg-secondary-70% data-[color=secondary]:focus:bg-secondary-60% data-[color=secondary]:text-white',
      secondary:
        'border border-primary bg-transparent hover:bg-primary-20% active:bg-primary-40% focus:bg-primary-20% text-primary  data-[color=secondary]:border-secondary data-[color=secondary]:hover:bg-secondary-20% data-[color=secondary]:active:bg-secondary-40% data-[color=secondary]:focus:bg-secondary-20% data-[color=secondary]:text-secondary-60%',
      text: 'text-primary hover:text-primary-60% active:text-primary-70% focus:text-primary-60% data-[color=secondary]:text-secondary-60% data-[color=secondary]:hover:text-secondary-70% data-[color=secondary]:active:text-secondary-80% data-[color=secondary]:focus:text-secondary-70%',
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
  ...props
}): ReactElement => {
  return match(href)
    .with(P.string, (link) => (
      <Link href={link}>
        <button
          data-color={color}
          className={cn(btnClassName({ variant, className, size }))}
          {...props}
        >
          {props.children}
        </button>
      </Link>
    ))
    .otherwise(() => (
      <button
        data-color={color}
        className={cn(btnClassName({ variant, className, size }))}
        {...props}
      >
        {props.children}
      </button>
    ));
};
