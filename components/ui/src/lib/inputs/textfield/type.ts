import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export type TTextField = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: 'text' | 'email' | 'password';
  errorMessage?: string;
};

export type TControlledTextField<T extends FieldValues> =
  UseControllerProps<T> & TTextField;
