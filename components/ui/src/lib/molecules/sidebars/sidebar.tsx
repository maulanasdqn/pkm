import Image from 'next/image';
import { NavLinkDashboard } from '../../atoms';
import { FC, ReactElement } from 'react';
import { TSidebarProps } from './type';

export const Sidebar: FC<TSidebarProps> = ({
  navItems,
  buttonLogout,
  name,
  imgSrc,
}): ReactElement => {
  return (
    <aside className="sticky left-0 top-[5.1rem] max-w-[18rem] w-full h-[90dvh] flex flex-col justify-between gap-14 py-10 px-5 shadow-sm border-r border-primary-20%">
      <div className="w-full flex gap-5 justify-center items-center">
        <Image
          src={imgSrc || '/images/profile.webp'}
          alt="profile"
          width={77}
          height={77}
          className="aspect-square rounded-full"
        />
        <div className="font-semibold">
          <h1 className="text-3xl">{name || 'Administrator'}</h1>
          <p className="text-xl">Admin</p>
        </div>
      </div>
      <NavLinkDashboard navItems={navItems} />
      {buttonLogout}
    </aside>
  );
};
