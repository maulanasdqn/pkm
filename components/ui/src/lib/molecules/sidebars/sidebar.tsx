'use client';
import Image from 'next/image';
import { NavLinkDashboard } from '../../atoms';
import { FC, ReactElement } from 'react';
import { TSidebarProps } from './type';
import { useSession } from 'next-auth/react';

export const Sidebar: FC<TSidebarProps> = ({
  navItems,
  buttonLogout,
}): ReactElement => {
  const { data } = useSession();

  return (
    <aside className="max-w-[18rem] w-full min-h-[88dvh] flex flex-col justify-between gap-14 py-10 px-5 shadow-sm border-r border-primary-20%">
      <div className="w-full flex gap-5 justify-center items-center">
        <Image
          src={data?.user?.image || '/images/profile.webp'}
          alt="profile"
          width={77}
          height={77}
          className="aspect-square rounded-full"
        />
        <div className="font-semibold">
          <h1 className="text-3xl">{'Admin'}</h1>
          <p className="text-xl">Admin</p>
        </div>
      </div>
      <NavLinkDashboard navItems={navItems} />
      {buttonLogout}
    </aside>
  );
};
