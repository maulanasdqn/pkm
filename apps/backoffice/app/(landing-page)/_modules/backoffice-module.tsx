import * as React from 'react';
import {
  GallerySection,
  HeroSection,
  ProgramSection,
  ResidentSection,
} from './sections';

export const BackofficeModule: React.FC = (): React.ReactElement => {
  return (
    <>
      <HeroSection />
      <ProgramSection />
      <ResidentSection />
      <GallerySection />
    </>
  );
};
