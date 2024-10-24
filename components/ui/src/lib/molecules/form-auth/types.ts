import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';

export type TFormAuth = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  title: string;
  buttonName: string;
  footer?: ReactNode;
  subtitle?: string;
  buttonLoading?: boolean;
};

export type TFormFooter = {
  title: string;
  link: string;
  linkName: string;
};
