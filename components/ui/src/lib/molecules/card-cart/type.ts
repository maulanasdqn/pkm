import { ChangeEvent, MouseEvent } from 'react';

export type TCardCart = {
  name: string;
  amount: number;
  price: number;
  imageUrl: string;
  onDelete?: (e: MouseEvent) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
};
