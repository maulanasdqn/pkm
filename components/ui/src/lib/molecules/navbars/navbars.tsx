import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { Button, NavLinks } from '../../atoms';
import { TNavbarAuthProps } from './type';
import { cn } from '@pkm/libs/clsx';
import { match } from 'ts-pattern';

export const Navbar: FC<TNavbarAuthProps> = ({
  apps,
  title,
  page,
}): ReactElement => {
  const navbarMatching = match(apps)
    .with('market', () => {
      return match(page)
        .with('auth', () => {
          return (
            <div className="flex gap-2">
              <Button href="/auth/login">MASUK</Button>
              <Button href="/auth/register" variant="text">
                DAFTAR
              </Button>
            </div>
          );
        })
        .with('public', () => {
          return (
            <Button href="/auth/login" size="lg" className="font-normal">
              Login
            </Button>
          );
        })
        .exhaustive();
    })
    .otherwise(() => {
      return match(page)
        .with('public', () => {
          return <NavLinks component="navbar" apps="tourism" />;
        })
        .with('auth', () => null)
        .exhaustive();
    });

  const navbarClassName = cn('py-3 bg-white', {
    'px-10 shadow-sm border-b border-neutral-20%': page === 'public',
    'px-12 container mx-auto': page === 'auth',
  });

  return (
    <header className={navbarClassName}>
      <div
        className={cn('w-full flex items-center justify-between', {
          'container mx-auto': page === 'public',
        })}
      >
        <div
          className={cn('flex gap-6 items-center', {
            'gap-4': page === 'public',
          })}
        >
          <Image
            src="/images/logo-desa.webp"
            alt="logo desa"
            width={500}
            height={500}
            quality={100}
            className={cn('w-16', {
              'w-20': page === 'public',
            })}
          />

          <h1
            className={cn('font-source-sans-pro', {
              'text-primary text-xl w-[190px] text-center': page === 'public',
              'text-3xl': page === 'auth',
            })}
          >
            {title}
          </h1>
        </div>

        {navbarMatching}
      </div>
    </header>
  );
};
