import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Exclude<TVariant, 'default' | 'info' | 'success' | 'warning'>;
  size?: TSize;
  variantType?: Extract<TVariant, 'primary' | 'secondary'> | 'text-only';
  href?: string;
  state?: TState;
  useIconArrowDown?: 'left' | 'right';
};
export type TSize = 'sm' | 'md' | 'lg';

export type TVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

export type TVariantType = 'solid' | 'outline';
export type TState = 'default' | 'loading';
