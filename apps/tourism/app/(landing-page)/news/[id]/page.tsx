import { ReactElement } from 'react';
import { NewsDetailModule } from './_modules';
import {
  getOneInformation,
  getTwoInformation,
} from '@pkm/libs/actions/tourism';
import Link from 'next/link';
import { NextPage } from 'next';

const NewsDetailPage: NextPage<{ params: { id: string } }> = async ({
  params: { id },
}): Promise<ReactElement> => {
  const { data } = await getOneInformation(id);
  const otherInformations = await getTwoInformation(id);
  if (!data) {
    return (
      <section className="container mx-auto my-10 space-y-7">
        <h1>Terjadi kesalahan, data tidak ditemukan!</h1>
        <Link href="/">Kembali ke beranda</Link>
      </section>
    );
  }
  return (
    <NewsDetailModule
      id={data.id}
      title={data.title}
      image={data.image}
      createdAt={data.createdAt}
      location={data.location}
      description={data.description}
      otherInformations={otherInformations.data}
    />
  );
};

export default NewsDetailPage;
