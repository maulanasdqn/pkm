import { FC, ReactElement } from 'react';
import { DestinationSection, HeroSection, NewsSection } from './sections';

export const LandingPageModule: FC = (): ReactElement => {
  return (
    <>
      <HeroSection />
      <DestinationSection />
      <NewsSection />
    </>
  );
};
