import { Fragment, type FC, type ReactElement } from 'react';
import { clsx } from 'clsx';
import { P, match } from 'ts-pattern';
import Link from 'next/link';
import { TButton } from './type';
import { AiFillCaretDown } from 'react-icons/ai';

export const Button: FC<TButton> = ({
  variant = 'primary',
  size = 'sm',
  variantType = 'primary',
  state = 'default',
  useIconArrowDown,
  ...props
}): ReactElement => {
  const className = clsx(
    'rounded-md font-medium transition-all disabled:cursor-not-allowed px-4 py-2',
    {
      'bg-primary text-white hover:bg-primary-60% active:bg-primary-90% disabled:bg-primary-10% disabled:text-primary-30%':
        variant === 'primary' && variantType === 'primary',
      'bg-secondary text-white hover:bg-secondary-60% active:bg-secondary-90% disabled:bg-secondary-10% disabled:text-secondary-30%':
        variant === 'secondary' && variantType === 'primary',
      'bg-red text-white hover:bg-red-60% active:bg-red-90% disabled:bg-red-10% disabled:text-red-30%':
        variant === 'error' && variantType === 'primary',
    },
    {
      'border border-primary text-primary bg-none hover:bg-primary-20% active:bg-primary-40% focus:bg-primary-20% disabled:bg-primary-10%':
        variant === 'primary' && variantType === 'secondary',
      'border border-secondary text-secondary bg-none hover:bg-secondary-20% active:bg-secondary-40% focus:bg-secondary-20% disabled:bg-secondary-10%':
        variant === 'secondary' && variantType === 'secondary',
      'border border-red text-red bg-none hover:bg-red-20% active:bg-red-40% focus:bg-red-20% disabled:bg-red-10%':
        variant === 'error' && variantType === 'secondary',
    },
    {
      'border-none bg-none text-primary hover:text-primary-40% active:text-primary-60% focus:text-primary-40% disabled:text-primary-10%':
        variant === 'primary' && variantType === 'text-only',
      'border-none bg-none text-secondary hover:text-secondary-40% active:text-secondary-60% focus:text-secondary-40% disabled:text-secondary-10%':
        variant === 'secondary' && variantType === 'text-only',
      'border-none bg-none text-red hover:text-red-40% active:text-red-60% focus:text-red-40% disabled:text-red-10%':
        variant === 'error' && variantType === 'text-only',
    },
    {
      'md:text-[10px] md:px-2.5 md:py-1.5': size === 'sm',
      'md:text-xs md:px-3 md:py-2': size === 'md',
      'md:text-sm md:px-3.5 md:py-2.5': size === 'lg',
    },
    {
      'inline-flex gap-1.5 lg:gap-2 items-center':
        useIconArrowDown === 'right' || useIconArrowDown === 'left',
    }
  );

  const classNameArrowDown = clsx({
    'text-sm md:text-base mt-0.5': size === 'lg',
    'text-xs md:text-sm': size === 'md',
    'text-[10px] md:text-xs': size === 'sm',
  });

  const iconArrowDown = match(useIconArrowDown)
    .with('left', () => (
      <Fragment>
        <AiFillCaretDown className={classNameArrowDown} /> {props.children}
      </Fragment>
    ))
    .with('right', () => (
      <Fragment>
        {props.children} <AiFillCaretDown className={classNameArrowDown} />
      </Fragment>
    ))
    .otherwise(() => props.children);

  const buttonState = match(state)
    .with('default', () => iconArrowDown)
    .with('loading', () => 'Loading...')
    .exhaustive();

  return match(props.href)
    .with(undefined, () => (
      <button className={className} {...props}>
        {buttonState}
      </button>
    ))
    .with(P.string, (link) => (
      <Link href={link}>
        <button className={className} {...props}>
          {buttonState}
        </button>
      </Link>
    ))
    .exhaustive();
};
