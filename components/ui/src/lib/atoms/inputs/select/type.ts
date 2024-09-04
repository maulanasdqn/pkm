import type {
  DetailedHTMLProps,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

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
