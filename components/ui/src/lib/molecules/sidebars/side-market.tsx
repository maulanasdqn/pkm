import { FC, ReactElement } from 'react';
import { TSidebarMarketProps } from './type';
import Image from 'next/image';
import { NavLinkDashboard } from '../../atoms';
import { LogoutButton } from './logout-button';

export const SidebarMarket: FC<TSidebarMarketProps> = ({
  navItems,
  name,
  imgSrc,
}): ReactElement => {
  return (
    <aside className="sticky left-0 top-[5rem] max-w-[334px] w-full h-screen flex flex-col justify-between gap-14 py-10 px-5 shadow-sm border-r border-primary-20% font-source-sans-pro bg-white">
      <div className="w-full flex flex-col gap-12">
        <div className="w-full flex gap-5 justify-center items-center">
          <Image
            src={imgSrc || '/images/profile.webp'}
            alt="profile"
            width={90}
            height={90}
            className="aspect-square rounded-full"
            priority
          />
          <div className="">
            <h1 className="text-2xl font-bold">{name || 'Administrator'}</h1>
            <p className="text-lg">Admin</p>
          </div>
        </div>
        <NavLinkDashboard navItems={navItems} />
      </div>

      <LogoutButton />
    </aside>
  );
};
