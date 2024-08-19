// import { Navbar } from '@pkm/ui'; navbar belum fix
import { Footer } from '@pkm/ui';
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
      <Footer />
    </main>
  );
}
