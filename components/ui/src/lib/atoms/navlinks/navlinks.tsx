'use client';
import { FC, ReactElement } from 'react';
import { NavLinksProps } from './type';
import { match } from 'ts-pattern';
import Link from 'next/link';
import { cn } from '@pkm/libs/clsx';
import { usePathname } from 'next/navigation';

const navLinksTourism = [
  {
    title: 'beranda',
    href: '/',
  },
  {
    title: 'destinasi',
    href: '/tours',
  },
  {
    title: 'informasi',
    href: '/news',
  },
  {
    title: 'tentang kami',
    href: '/about',
  },
  {
    title: 'reservasi',
    href: '/reservation',
  },
];

export const NavLinks: FC<NavLinksProps> = ({
  component,
  apps,
}): ReactElement => {
  const pathname = usePathname();
  console.log(pathname);
  return match(apps)
    .with('tourism', () => {
      return match(component)
        .with('footer', () => {
          return (
            <ul className="flex flex-col items-left gap-4">
              {navLinksTourism.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    title={item.title}
                    className="text-xl font-semibold capitalize font-source-sans-pro"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          );
        })
        .with('navbar', () => {
          return (
            <ul className="flex items-left gap-4">
              {navLinksTourism.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    title={item.title}
                    className={cn(
                      'text-xl font-semibold capitalize font-source-sans-pro',
                      item.href === pathname ? 'text-primary' : 'text-black/50'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          );
        })
        .exhaustive();
    })
    .otherwise(() => {
      return <nav>Market Nav</nav>;
    });
};
