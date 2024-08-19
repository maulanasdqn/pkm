// import { Navbar } from '@pkm/ui'; navbar belum fix
import { FooterTourism } from '@pkm/ui';
import { ReactElement, ReactNode } from 'react';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <main className="w-full h-screen flex flex-col">
      {/* <Navbar title="Wisata Desa Bojongsari" apps="tourism" /> */}
      {children}
      <FooterTourism />
    </main>
  );
}
