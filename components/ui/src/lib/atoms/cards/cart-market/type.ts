import { ComponentType } from 'react';

export type TCardMarket = {
  href: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type TCardMarketAdmin = {
  name: string;
  amount: number | string;
  className?: string;
  Icon: ComponentType<{ className?: string }>;
};
