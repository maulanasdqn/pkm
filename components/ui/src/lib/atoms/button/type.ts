import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  DetailedHTMLProps,
} from 'react';

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {
    href?: string;
    variant?: 'primary' | 'secondary' | 'text';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    color?: 'primary' | 'secondary' | 'red' | 'black';
  };
