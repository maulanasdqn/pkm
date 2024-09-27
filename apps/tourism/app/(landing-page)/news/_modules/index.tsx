import { FC, ReactElement, Suspense } from 'react';
import { HeroSection, NewsListSection } from './sections';
import { LoadingOutlined } from '@ant-design/icons';

export const NewsPageModule: FC = (): ReactElement => {
  return (
    <>
      <HeroSection className="mb-10 md:mb-20" />
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex justify-center items-center">
            <span className="flex gap-3">
              <LoadingOutlined className="animate-spin" />
              Loading
            </span>
          </div>
        }
      >
        <NewsListSection className="mb-10 md:mb-20" />
      </Suspense>
    </>
  );
};
