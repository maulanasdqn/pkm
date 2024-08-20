import { FooterMarket, Navbar } from '@pkm/ui';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <Navbar
        apps="market"
        page="public"
        title="Digitalisasi Pasar Desa Bojongsari"
      />

      {children}

      <FooterMarket />
    </main>
  );
}
