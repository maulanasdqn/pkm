import { ReactElement, ReactNode } from 'react';
import { FooterBackoffice, Navbar } from '@pkm/ui';

export default async function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  return (
    <main className="w-full min-h-screen flex flex-col font-source-sans-pro">
      <Navbar title="Layanan Desa Bojongsari" apps="backoffice" page="public" />
      {children}
      <FooterBackoffice />
    </main>
  );
}
