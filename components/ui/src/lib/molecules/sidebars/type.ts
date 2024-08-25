import { ReactNode } from 'react';

export type TSidebarProps = {
  navItems: NavItems;
  buttonLogout: ReactNode;
};
export type NavItems = {
  icon: ReactNode;
  title: string;
  href: string;
}[];
