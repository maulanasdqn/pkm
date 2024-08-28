import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export type TCheckBox = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>;
export type TControlledCheckBox<T extends FieldValues> = UseControllerProps<T> &
  TCheckBox;
