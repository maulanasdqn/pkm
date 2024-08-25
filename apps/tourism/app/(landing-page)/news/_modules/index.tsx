import { FC, ReactElement } from 'react';
import { HeroSection, NewsListSection } from './sections';

export const NewsPageModule: FC = (): ReactElement => {
  return (
    <>
      <HeroSection className='mb-20'/>
      <NewsListSection className='mb-20'/>
    </>
  );
};
