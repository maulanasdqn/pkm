'use client';
import { FC, ReactElement } from 'react';
import { TNavLinkDashboardProps } from './type';
import { Button } from '../button';
import { cn } from '@pkm/libs/clsx';
import { usePathname } from 'next/navigation';

export const NavLinkDashboard: FC<TNavLinkDashboardProps> = ({
  navItems,
}): ReactElement => {
    const pathname = usePathname()
  return (
    <nav className="w-full flex flex-col gap-3">
      {navItems.map((item, index) => (
        <Button
          key={index}
          href={item.href}
          title={item.title}
          variant="text"
          className={cn(
            'w-full flex p-0 gap-3 px-5 justify-start rounded-lg items-center text-primary hover:bg-primary-10%/80',
            {
              'shadow-md bg-primary-10% hover:bg-primary-10%/80 focus:bg-primary-10%/80':
                item.href === pathname,
            }
          )}
        >
          {item.icon}
          <span className="text-xl font-normal leading-none">{item.title}</span>
        </Button>
      ))}
    </nav>
  );
};
