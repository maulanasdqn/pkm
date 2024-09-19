import Link from 'next/link';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { TourDetailModule } from './_modules';
import { getOneDestination } from '@pkm/libs/actions/tourism';

const TourDetailPage: NextPage<{ params: { id: string } }> = async ({
  params: { id },
}): Promise<ReactElement> => {
  const { data } = await getOneDestination(id);
  if (!data) {
    return (
      <section className="container mx-auto my-10 space-y-7">
        <h1>Terjadi kesalahan, data tidak ditemukan!</h1>
        <Link href="/">Kembali ke beranda</Link>
      </section>
    );
  }
  return (
    <TourDetailModule
      id={data?.id}
      name={data.name}
      description={data.description}
      status={data?.status}
      images={data.images}
      ticketPrice={data?.ticketPrice}
    />
  );
};

export default TourDetailPage;
