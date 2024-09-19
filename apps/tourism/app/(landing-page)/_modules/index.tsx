import { FC, ReactElement } from 'react';
import { DestinationSection, HeroSection, NewsSection } from './sections';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

export const LandingPageModule: FC = async (): Promise<ReactElement> => {
  const destinations = await getAllDestinations();

  return (
    <>
      <HeroSection />
      {destinations ? (
        <DestinationSection data={destinations.data} />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      )}
      <NewsSection />
    </>
  );
};
