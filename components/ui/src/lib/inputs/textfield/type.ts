import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type TTextField = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: 'text' | 'email' | 'password';
  errorMessage?: string;
};
