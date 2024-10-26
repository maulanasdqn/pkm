import * as React from 'react';
import { ProgramCard } from './program.card';
import { Button } from '@pkm/ui';
import Link from 'next/link';

const programs = [
  {
    title: 'Pelatihan LINMAS Desa',
    description:
      'Pelatihan linmas (Perlindungan Masyarakat) di desa adalah program penting yang bertujuan untuk meningkatkan kapasitas anggota LINMAS dalam menjaga ketertiban dan keamanan desa.',
  },
  {
    title: 'Budidaya ikan dalam ember',
    description:
      'Program Budidaya Ikan dalam Ember (Budikdamber) adalah kegiatan yang inovatif dan sederhana dalam memanfaatkan ruang sempit untuk memelihara ikan.',
  },
  {
    title: 'Pelatihan kelompok petani',
    description:
      'Program Pelatihan Kelompok Petani merupakan inisiatif yang bertujuan untuk meningkatkan keterampilan dan pengetahuan petani dalam mengelola pertanian secara lebih efektif.',
  },
];
export const ProgramSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-14 container flex flex-col gap-6 items-center justify-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
        Program Unggulan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {programs.map(({ title, description }, index) => (
          <ProgramCard key={index} title={title} description={description} />
        ))}
      </div>
      <Link href="/program">
        <Button>Lihat semua program</Button>
      </Link>
    </section>
  );
};
