'use client';
import { signOut } from 'next-auth/react';
import { FC, ReactElement } from 'react';
import { Button } from '../../atoms';
import { LogoutOutlined } from '@ant-design/icons';

export const LogoutButton: FC = (): ReactElement => {
  return (
    <Button
      onClick={async () =>
        await signOut({
          redirect: true,
          callbackUrl: '/auth/login',
        })
      }
      variant="text"
      className="w-full flex gap-3 justify-start rounded-lg items-center text-primary hover:bg-primary-10%/80"
    >
      <LogoutOutlined className="text-2xl" />
      <span className="text-xl font-normal leading-none">Keluar</span>
    </Button>
  );
};
