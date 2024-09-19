import { FC, ReactElement } from 'react';
import { DestinationSection, HeroSection, NewsSection } from './sections';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

export const LandingPageModule: FC = async (): Promise<ReactElement> => {
  const destinations = [];
  try {
    const { data } = await getAllDestinations();
    destinations.push(...data);
  } catch (error) {
    throw new Error('something went wrong!');
  }

  return (
    <>
      <HeroSection />
      <DestinationSection data={destinations} />
      <NewsSection />
    </>
  );
};
