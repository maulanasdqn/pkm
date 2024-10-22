import { AutoImageSlider } from '@pkm/ui';
import { FC, ReactElement } from 'react';

const images = [
  '/images/slide-market-1.webp',
  '/images/slide-market-2.webp',
  '/images/slide-market-3.webp',
];

export const ActivitySectionAbout: FC = (): ReactElement => {
  return (
    <div className="flex flex-col items-center gap-14 mt-24 overflow-hidden">
      <h4 className="text-4xl font-bold">
        Kegiatan Sosial dan Budaya di Pasar Desa
      </h4>

      <AutoImageSlider
        imageClassName="min-w-[641px] min-h-[489px]"
        images={images}
        toX={-420}
      />

      <p className="text-3xl px-20 mb-24">
        Pasar Desa adalah platform digital yang didirikan untuk menghubungkan
        produk-produk lokal dari desa dengan pasar yang lebih luas.Di Pasar
        Desa, kami bekerja sama dengan masyarakat dan mitra lokal untuk
        memastikan setiap produk yang ditawarkan merepresentasikan keunikan dan
        kualitas terbaik dari setiap desa. Produk yang tersedia mencakup
        berbagai sektor, seperti hasil pertanian, kerajinan tangan, makanan
        khas, hingga produk kreatif lainnya. Melalui kolaborasi ini, kami
        berkomitmen untuk mendukung keberlanjutan ekonomi desa dengan cara yang
        adil dan inklusif.
      </p>
    </div>
  );
};
