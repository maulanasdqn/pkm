import Image from 'next/image';
import * as React from 'react';

export const MisiSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-14 container flex flex-wrap h-fit gap-8 items-start justify-center">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-medium">
          Misi Desa Bojongsari
        </h1>
        <ol className="list-decimal text-base sm:text-lg md:text-xl">
          <li>Pembenahan tata kelola pemerintahan desa di semua bidang</li>
          <li>
            Menciptakan hubungan yang harmonis dalam pelaksanaan pembangunan
            desa
          </li>
          <li>
            Meningkatkan mutu SDM (Sumber Daya Manusia) yang berkelanjutan dan
            berwawasan lingkungan
          </li>
          <li>
            Menjaga nilai-nilai luhur yang telah terbentuk di masyarakat guna
            menjaga persatuan dan kesatuan NKRI
          </li>
          <li>
            Selalu siap dan tanggap dengan perubahan yang dinamis dan siap
            melakukan perbaikan yang berkesinambungan.
          </li>
        </ol>
      </div>
      <div className="text-center space-y-4">
        <Image
          src="/images/kades.jpeg"
          width={330}
          height={347}
          alt="kades bojongsari"
          className="object-fit w-[230px] h-[300px]"
        />
        <h1 className="text-lg md:text-xl font-bold uppercase">
          Asep Sunandar, S.AP
        </h1>
        <p className="text-sm sm:text-base md:text-lg">
          Kepala Desa Bojongsari
        </p>
      </div>
    </section>
  );
};
