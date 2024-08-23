'use client';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { Button } from '../../atoms';
import { TNavbarAuthProps } from './type';
import { cn } from '@pkm/libs/clsx';
import { match } from 'ts-pattern';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navList = [
  {
    name: 'Beranda',
    link: '/',
  },
  {
    name: 'Produk',
    link: '/products',
  },
  {
    name: 'Tentang Kami',
    link: '/about',
  },
  {
    name: 'Kontak Kami',
    link: '/contact',
  },
];

export const Navbar: FC<TNavbarAuthProps> = ({
  apps,
  title,
  page,
}): ReactElement => {
  const pathname = usePathname();

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
            <div className="flex items-center gap-16">
              <nav className="flex items-center gap-12">
                {navList?.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className={cn(
                      'text-xl font-normal font-source-sans-pro transition-all duration-200',
                      {
                        'text-neutral-60% hover:text-black':
                          pathname !== item.link,
                        'hover:text-neutral-70%': pathname === item.link,
                      }
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Button href="/auth/login" size="lg" className="font-normal">
                Login
              </Button>
            </div>
          );
        })
        .exhaustive();
    })
    .otherwise(() => null);

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
          <Link href="/">
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
          </Link>

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
