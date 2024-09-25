import { ReactNode } from 'react';

export type TSidebarProps = {
  navItems: NavItems;
  buttonLogout: ReactNode;
  name: string;
  imgSrc?: string;
};

export type TSidebarMarketProps = Omit<TSidebarProps, 'buttonLogout'>;

export type NavItems = {
  icon: ReactNode;
  title: string;
  href: string;
}[];
