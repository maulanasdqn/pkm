import * as React from 'react';

export const ProfileSection: React.FC = (): React.ReactElement => {
  return (
    <section className="bg-primary-10%">
      <div className="py-14 flex flex-wrap lg:flex-nowrap gap-8 items-center container">
        <div className="overflow-hidden pb-5 relative h-[395px] w-full md:w-[500px] shrink-0">
          <iframe
            width={500}
            height={395}
            src="https://www.youtube.com/embed/kg8qo-h_RVA"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Embedded youtube"
            className="left-0 top-0 size-full absolute"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-neutral-100% font-semibold">
            Profil Desa Bojongsari
          </h1>
          <div className="text-left text-sm sm:text-base md:text-lg space-y-2">
            <p>
              Desa Bojongsari merupakan salah satu dari 6 desa di wilayah
              Kecamatan Bojongsoang, yang terletak 5 Km ke arah Selatan dari
              Kecamatan Bojongsoang, Desa Bojongsari mempunyai luas wilayah
              seluas 513,51 hektar.
            </p>
            <p>
              Desa Bojongsari berdiri pada tanggal 2, bulan Desember 1979.
              Berdasarkan Peraturan Pemerintah Nomor 16 Tahun 1987
              pemekaran/pisah Desa Bojongsoang ialah sebagai berikut :
            </p>
            <ol className="list-decimal ml-5">
              <li>Desa Bojongsari Kecamatan Buahbatu</li>
              <li>Desa Bojongsari Kecamatan Bojongsoang</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
