import * as React from 'react';
import Image from 'next/image';

export const StructureSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-14 container space-y-8 flex flex-col items-center justify-center">
      <h1 className="max-w-3xl text-xl md:text-2xl lg:text-3xl leading-relaxed text-primary text-left md:text-center font-semibold uppercase">
        STRUKTUR ORGANISASI DAN TATA KERJA PEMERINTAH DESA BOJONGSARI KECAMATAN
        BOJONGSOANG KABUPATEN BANDUNG
      </h1>
      <div className="p-4 md:p-8 overflow-x-auto w-full h-fit shadow rounded bg-white">
        <div className="w-[1324px] h-[560px]">
          <Image
            src="/images/struktur-organisasi.png"
            alt="struktur-desa"
            width={1324}
            height={560}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
