import Link from 'next/link';
import { FC, Fragment, ReactElement } from 'react';
import { CreateReservationSection, HeroSection } from './sections';
import { getOneDestination } from '@pkm/libs/actions/tourism';

export const CreateReservationModule: FC<{ id: string }> = async ({
  id,
}): Promise<ReactElement> => {
  const { data } = await getOneDestination(id);
  if (!data) {
    return (
      <section className="container mx-auto my-10 space-y-7">
        <h1>Terjadi kesalahan, data destination tidak ditemukan!</h1>
        <Link href="/">Kembali ke beranda</Link>
      </section>
    );
  }
  return (
    <Fragment>
      <HeroSection className="mb-20" />
      <CreateReservationSection
        dataDestination={{
          id: data.id,
          name: data.name,
          description: data.description,
          ticketPrice: data.ticketPrice,
        }}
        className="mb-20"
      />
    </Fragment>
  );
};
