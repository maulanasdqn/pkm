import { FC, ReactElement } from 'react';
import { AutoImageSlider } from '@pkm/ui';

const images = [
  '/images/market-activity.webp',
  '/images/market-activity-2.webp',
  '/images/market-activity-3.webp',
];

export const ActivitySection: FC = (): ReactElement => {
  return (
    <div className="w-full flex flex-col items-center gap-12 overflow-hidden">
      <h3 className="text-4xl">Aktivitas Pasar Desa</h3>

      <AutoImageSlider images={images} />
    </div>
  );
};
