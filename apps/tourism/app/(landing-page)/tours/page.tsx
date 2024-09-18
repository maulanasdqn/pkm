import { NextPage } from 'next';
import { ReactElement } from 'react';
import { ToursPageModule } from './_modules';
import { getAllDestinations } from '@pkm/libs/actions/tourism';
import Link from 'next/link';

const ToursPage: NextPage = async (): Promise<ReactElement> => {
  const { data } = await getAllDestinations();
  if (!data) {
    return (
      <section className="container mx-auto my-10 space-y-7">
        <h1>Terjadi kesalahan,data destinasi belum ada/tidak ditemukan!</h1>
        <Link href="/">Kembali ke beranda</Link>
      </section>
    );
  }
  return <ToursPageModule data={data} />;
};

export default ToursPage;
