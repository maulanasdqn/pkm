import { NavbarAuth } from '@pkm/ui';
import { ReactElement } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <main className="w-full h-screen flex flex-col">
      <NavbarAuth apps="tourism" title="Wisata Desa Bojongsari" />

      <section className="w-full h-full bg-[url('/images/desa-bg.webp')] bg-cover">
        <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-70">
          <div className="bg-white flex flex-col justify-center items-center rounded-xl min-h-[520px] max-w-[500px] py-6 min-w-[480px]">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
