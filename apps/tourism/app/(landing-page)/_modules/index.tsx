import { FC, ReactElement } from 'react';
import { DestinationSection, HeroSection } from './sections';
import { NewsSection } from './sections/news-section/news-section';
import CTASection from './sections/cta-section';
import InfoSection from './sections/info-section';

export const LandingPageModule: FC = (): ReactElement => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <div className="container mx-auto">
        <NewsSection />
      </div>
      <CTASection />
      <DestinationSection />
      <InfoSection />
    </main>
  );
};
