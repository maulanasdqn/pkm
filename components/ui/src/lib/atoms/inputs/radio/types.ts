import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type TRadio = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & {
  label: string;
  sublabel?: string;
};
