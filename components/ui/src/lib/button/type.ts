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
    variant?:
      | 'primary'
      | 'secondary'
      | 'text'
      | 'yellowPrimary'
      | 'yellowSecondary'
      | 'yellowText';
    size: 'sm' | 'md' | 'lg' | 'icon';
  };
