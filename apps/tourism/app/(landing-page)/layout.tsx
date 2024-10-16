import { Navbar } from '@pkm/ui';
import { FooterTourism } from '@pkm/ui';
import { ReactElement, ReactNode } from 'react';

export default async function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  return (
    <main className="w-full min-h-screen flex flex-col font-source-sans-pro">
      <Navbar title="Wisata Desa Bojongsari" apps="tourism" page="public" />
      {children}
      <FooterTourism />
    </main>
  );
}
