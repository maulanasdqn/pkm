import { ComponentType } from 'react';

export type TCardMarket = {
  href: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type TCardMarketAdmin = {
  name: string;
  amount: number;
  Icon: ComponentType<{ className?: string }>;
};
