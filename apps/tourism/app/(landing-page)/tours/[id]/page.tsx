import { NextPage } from 'next';
import { ReactElement } from 'react';
import { TourDetailModule } from './_modules';
import { getOneDestination } from '@pkm/libs/actions/tourism';

const TourDetailPage: NextPage<{ params: { id: string } }> = async ({
  params: { id },
}): Promise<ReactElement> => {
  const { data } = await getOneDestination(id);
  if (!data) throw new Error('Something went wrong! Data Not Found!');
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
