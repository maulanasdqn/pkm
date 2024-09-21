import { FC, ReactElement } from 'react';
import { HeroSection, VisiMisiSection } from './sections';

export const AboutModule: FC = (): ReactElement => {
  return (
    <>
      <HeroSection className="mb-10 md:mb-20" />
      <VisiMisiSection className="mb-10 md:mb-20" />
    </>
  );
};
