import { MouseEvent } from 'react';

export type TCardCart = {
  name: string;
  amount: number;
  price: number;
  imageUrl: string;
  onDelete?: (e: MouseEvent) => void;
  value: string | number;
};
