import { VariantProps } from 'class-variance-authority';
import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { textareaClassName } from './textarea';

export type TTextArea = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  errorMessage?: string;
};

export type TControlledTextarea<T extends FieldValues> = UseControllerProps<T> &
  TTextArea;
export type TTextAreaProps = TTextArea & VariantProps<typeof textareaClassName>;
