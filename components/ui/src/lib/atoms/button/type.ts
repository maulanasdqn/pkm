import { VariantProps } from 'class-variance-authority';
import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  DetailedHTMLProps,
} from 'react';
import { btnClassName } from './button';

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > &
  VariantProps<typeof btnClassName> & {
    variant?: 'primary' | 'secondary' | 'text';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    href?: string;
    color?: 'primary' | 'secondary' | 'red' | 'black';
    isLoading?: boolean;
  };
