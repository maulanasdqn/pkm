import { HeroMarket } from '@pkm/ui';

export default function ProductIdLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <section className="w-full flex flex-col items-center gap-8">
      <HeroMarket imageUrl="/images/sample-hero-3.webp" className="gap-6">
        <h2 className="text-4xl font-bold">DETAIL PRODUK</h2>
        <h3 className="text-3xl uppercase">Kopi</h3>
      </HeroMarket>

      {children}
    </section>
  );
}
