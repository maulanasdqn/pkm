import * as React from 'react';
import Image from 'next/image';
import { dataGallery } from '@pkm/libs/entities';

export const ActivityModule: React.FC = (): React.ReactElement => {
  return (
    <section className="py-10 md:py-14 relative">
      <div className="container flex flex-col items-center text-center w-full space-y-6 md:space-y-8 lg:space-y-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-100%">
          Kegiatan Desa
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
          Kegiatan di Desa Bojongsari mencakup berbagai program pembangunan dan
          pemberdayaan masyarakat. Ini meliputi pembangunan infrastruktur
          seperti jalan dan fasilitas umum, program kesehatan, pelatihan
          keterampilan untuk meningkatkan ekonomi warga, serta kegiatan sosial
          dan budaya yang mempererat hubungan antarwarga. Semua kegiatan
          dirancang berdasarkan musyawarah desa dan bertujuan meningkatkan
          kesejahteraan serta kualitas hidup masyarakat desa.{' '}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-14 space-y-8 container">
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-100%">
            Galeri kegiatan
          </h1>
        </div>
        {dataGallery.map(({ title, img }) => (
          <div key={img} className="relative">
            <Image
              src={img}
              alt={title}
              height={300}
              width={450}
              className="object-cover w-full h-[300px]"
              priority
            />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[350px] bg-primary px-4 py-2 rounded text-center">
              <h1 className="text-base md:text-lg font-semibold uppercase text-white">
                {title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
