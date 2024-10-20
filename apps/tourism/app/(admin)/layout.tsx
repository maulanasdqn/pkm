import {
  CalendarOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { auth } from '@pkm/libs/auth/tourism';
import { cn } from '@pkm/libs/clsx';
import { Button, Navbar, Sidebar } from '@pkm/ui';
import { logOut } from 'libs/auth/src/lib/tourism/util';
import { redirect } from 'next/navigation';
import { ReactElement, ReactNode } from 'react';

const iconClassName = 'text-xl shrink-0';
const navItems = [
  {
    icon: <HomeOutlined className={iconClassName} />,
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <EditOutlined className={iconClassName} />,
    title: 'Manajemen Wisata',
    href: '/dashboard/tour',
  },
  {
    icon: <ReadOutlined className={iconClassName} />,
    title: 'Manajemen Informasi',
    href: '/dashboard/information',
  },
  {
    icon: <CalendarOutlined className={iconClassName} />,
    title: 'Manajemen Reservasi',
    href: '/dashboard/reservation',
  },
];
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  }
  return (
    <main className="w-full min-h-screen flex flex-col font-source-sans-pro 2xl:container 2xl:mx-auto">
      <Navbar title="Wisata Desa Bojongsari" apps="tourism" page="dashboard" />
      <section className="w-full flex">
        {session && (
          <Sidebar
            name={session.user.fullname as string}
            imgSrc={session.user.image as string}
            navItems={navItems}
            buttonLogout={
              <form
                action={async () => {
                  'use server';
                  await logOut();
                }}
              >
                <Button
                  variant="text"
                  className={cn(
                    'w-full flex p-0 gap-3 px-5 justify-start rounded-lg items-center text-primary hover:bg-primary-10%/80'
                  )}
                >
                  <LogoutOutlined className="text-xl shrink-0" />
                  <span className="text-xl font-normal leading-none">
                    Keluar
                  </span>
                </Button>
              </form>
            }
          />
        )}
        {children}
      </section>
    </main>
  );
}
