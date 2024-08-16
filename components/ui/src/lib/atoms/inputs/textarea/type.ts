import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export type TTextArea = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  errorMessage?: string;
};

export type TControlledTextarea<T extends FieldValues> = UseControllerProps<T> &
  TTextArea;
