import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { Button } from '../../atoms';

export const NavbarAuth: FC = (): ReactElement => {
  return (
    <header className="px-12 py-3 flex w-full justify-between items-center bg-white container mx-auto">
      <div className="flex gap-6 items-center">
        <Image
          src="/images/logo-desa.webp"
          alt="logo desa"
          width={500}
          height={500}
          quality={100}
          className="w-16"
        />

        <h1 className="text-3xl font-source-sans-pro">
          Digitalisasi Pasar Desa
        </h1>
      </div>

      <div className="flex gap-2">
        <Button href="/auth/login">MASUK</Button>
        <Button href="/auth/register" variant="text">
          DAFTAR
        </Button>
      </div>
    </header>
  );
};
