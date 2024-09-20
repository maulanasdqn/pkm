import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { textfieldClassName } from './textfield';
import { VariantProps } from 'class-variance-authority';

export type TTextField = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: 'text' | 'email' | 'password' | 'search' | 'file' | 'number' | 'time';
  errorMessage?: string;
};

export type TControlledTextField<T extends FieldValues> =
  UseControllerProps<T> & TTextField;
export type TTextFieldProps = TTextField &
  VariantProps<typeof textfieldClassName>;
