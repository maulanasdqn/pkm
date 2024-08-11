import { FC, ReactElement } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@pkm/libs/clsx';
import Link from 'next/link';
import { TButton } from './type';
import { P, match } from 'ts-pattern';

const btnClassName = cva('rounded-full w-fit ', {
  variants: {
    variant: {
      primary:
        'bg-green-4 hover:bg-green-2 transition-all duration-300 text-white py-[6px] px-[24px] md:py-[11px] md:px-[32px]',
      secondary:
        'bg-transparent text-black hover:text-green-4 border border-black hover:border-green-4 py-[6px] px-[24px] md:py-[11px] md:px-[32px]',
      ghost:
        'bg-transparent text-white border border-white py-[11px] px-[32px]',
      gradient:
        'bg-white rounded-[8px] font-medium text-[18px] text-black hover:text-green-4 py-[4px] px-[16px]',
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
});

export const Button: FC<TButton & VariantProps<typeof btnClassName>> = ({
  className,
  href,
  variant,
  suspense,
  ...props
}): ReactElement => {
  return match({
    href,
    variant,
    suspense,
  })
    .with({ suspense: true }, () => (
      <button
        className={cn(
          btnClassName({
            variant,
            className: `${className} bg-grey-1 animate-pulse text-grey-1`,
          })
        )}
        {...props}
      >
        {props.children}
      </button>
    ))
    .with(
      {
        href: P.string,
        variant: P.not('gradient'),
      },
      (data) => (
        <Link href={data.href}>
          <button
            className={cn(btnClassName({ variant, className }))}
            {...props}
          >
            {props.children}
          </button>
        </Link>
      )
    )
    .with(
      {
        href: P.union(P.nullish, undefined),
        variant: P.not('gradient'),
      },
      () => (
        <button className={cn(btnClassName({ variant, className }))} {...props}>
          {props.children}
        </button>
      )
    )

    .with(
      {
        href: P.union(P.nullish, undefined),
        variant: 'gradient',
      },
      () => (
        <div className="w-fit border-[1.3px] bg-gradient pl-[14px] border-grey-2 hover:border-green rounded-[8px]">
          <button
            className={cn(btnClassName({ variant, className }))}
            {...props}
          >
            {props.children}
          </button>
        </div>
      )
    )
    .with(
      {
        href: P.string,
        variant: 'gradient',
      },
      (data) => (
        <Link
          prefetch={false}
          href={data.href}
          aria-label={`${props.children}`}
        >
          <div className="w-fit border-[1.3px] bg-gradient pl-[14px] border-grey-2 hover:border-green rounded-[8px]">
            <button
              className={cn(btnClassName({ variant, className }))}
              {...props}
            >
              {props.children}
            </button>
          </div>
        </Link>
      )
    )
    .otherwise(() => (
      <button className={cn(btnClassName({ variant, className }))} {...props}>
        {props.children}
      </button>
    ));
};
