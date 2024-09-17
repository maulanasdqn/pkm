import { VariantProps } from 'class-variance-authority';
import type {
  DetailedHTMLProps,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { selectClassName } from './select';

export type TSelect = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  placeholder?: string;
  errorMessage?: string;
};

export type TSelectOption = DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

export type TControlledSelect<T extends FieldValues> = UseControllerProps<T> &
  TSelect;
export type TSelectProps = TSelect & VariantProps<typeof selectClassName>;
