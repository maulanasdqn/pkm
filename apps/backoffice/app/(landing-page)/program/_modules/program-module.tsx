import * as React from 'react';
import { HeroSection, ProgramActSection, ProgramDescSection } from './sections';

export const ProgramModule: React.FC = (): React.ReactElement => {
  return (
    <>
      <HeroSection />
      <ProgramDescSection />
      <ProgramActSection />
    </>
  );
};
