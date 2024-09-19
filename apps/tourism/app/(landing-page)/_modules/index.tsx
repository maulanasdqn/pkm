import { FC, ReactElement } from 'react';
import { DestinationSection, HeroSection, NewsSection } from './sections';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

export const LandingPageModule: FC = async (): Promise<ReactElement> => {
  const { data } = await getAllDestinations();

  return (
    <>
      <HeroSection />
      <DestinationSection data={data} />
      <NewsSection />
    </>
  );
};
