import { FC, ReactElement } from 'react';
import { DestinationSection, HeroSection, NewsSection } from './sections';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

export const LandingPageModule: FC = async (): Promise<ReactElement> => {
  // const destinations = await getAllDestinations();

  return (
    <>
      <HeroSection />
      {/* {destinations.data ? (
        <DestinationSection data={destinations.data} />
      ) : null} */}
      <NewsSection />
    </>
  );
};
