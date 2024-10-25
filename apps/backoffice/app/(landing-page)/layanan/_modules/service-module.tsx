import * as React from 'react';
import { DescServiceSection, HeroServiceSection } from './sections';

export const ServiceModule: React.FC = (): React.ReactElement => {
  return (
    <>
      <HeroServiceSection />
      <DescServiceSection />
    </>
  );
};
