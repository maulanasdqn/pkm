'use client';
import { FC, ReactElement } from 'react';
import { NavLinksProps } from './type';
import { match } from 'ts-pattern';
import Link from 'next/link';
import { cn } from '@pkm/libs/clsx';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../sheet';
import { Button } from '../button';
import { MenuOutlined } from '@ant-design/icons';

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
                    className="text-xl font-semibold capitalize font-source-sans-pro hover:text-primary/70 transition-colors duration-300"
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
            <>
              <ul className="flex items-left gap-4">
                {navLinksTourism.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      title={item.title}
                      className={cn(
                        'hidden md:block md:text-lg lg:text-xl font-semibold capitalize font-source-sans-pro hover:text-primary/70 transition-colors duration-300',
                        item.href === pathname
                          ? 'text-primary'
                          : 'text-black/50'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Sheet>
                <SheetTrigger className="md:hidden" asChild>
                  <Button variant="secondary" size="icon">
                    <MenuOutlined />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="my-5">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Selamat datang di Wisata Desa Bojongsari
                    </SheetDescription>
                  </SheetHeader>
                  <ul className="space-y-3">
                    {navLinksTourism.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          title={item.title}
                          className={cn(
                            'text-xl font-semibold capitalize font-source-sans-pro',
                            item.href === pathname
                              ? 'text-primary'
                              : 'text-black/50'
                          )}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
            </>
          );
        })
        .exhaustive();
    })
    .otherwise(() => {
      return <nav>Market Nav</nav>;
    });
};
