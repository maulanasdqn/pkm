import { NavItems } from '../../molecules/sidebars/type';

export type NavLinksProps = {
  component: 'navbar' | 'footer';
  apps: 'tourism' | 'market';
};

export type TNavLinkDashboardProps = {
  navItems: NavItems;
};
