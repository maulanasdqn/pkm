import * as React from 'react';

export const VisiSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-14 gap-8 container flex flex-col w-full items-center justify-center">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
          Visi Kabupaten Bandung
        </h1>
        <p className="text-sm sm:text-base md:text-lg">
          “Terwujudnya Masyarakat Kabupaten Bandung Yang Bangkit,Edukatif,
          Dinamis, Agamis dan Sejahtera.“
        </p>
      </div>
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
          Visi Desa Bojongsari
        </h1>
        <p className="text-sm sm:text-base md:text-lg">
          “ Menuju bersama dari Desa maju menjadi Desa Mandiri, melalui
          manajemen Desa yang transparan, adil, cepat, tepat, sesuai dengan
          aturan dan bertanggung jawab“
        </p>
      </div>
    </section>
  );
};
