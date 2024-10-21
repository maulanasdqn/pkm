import { HeroMarket } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { ActivitySectionAbout, MissionSection } from './sections';

export const AboutModule: FC = (): ReactElement => {
  return (
    <section className="w-full flex flex-col items-center gap-8 font-source-sans-pro">
      <HeroMarket imageUrl="/images/hero-market-about.webp" className="gap-8">
        <h2 className="text-4xl font-bold">TENTANG KAMI</h2>
        <p className="w-[60%] text-3xl font-normal text-center">
          Kami hadir untuk memajukan pasar desa melalui digitalisasi. Dengan
          platform ini, kami membantu pedagang desa mengakses pasar yang lebih
          luas, meningkatkan penjualan, dan memperkenalkan produk unggulan desa
          ke masyarakat luas.
        </p>
      </HeroMarket>

      <div className="w-full flex flex-col container mx-auto">
        <MissionSection />

        <ActivitySectionAbout />
      </div>
    </section>
  );
};
