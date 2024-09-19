import { FC, ReactElement } from 'react';
import { DestinationSection, HeroSection, NewsSection } from './sections';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

export const LandingPageModule: FC = async (): Promise<ReactElement> => {
  const destinations = await getAllDestinations();
  if (!destinations.status.ok) {
    throw new Error('Data destinasi tidak ditemukan!');
  }

  return (
    <>
      <HeroSection />
      <DestinationSection data={destinations.data} />
      <NewsSection />
    </>
  );
};
