import { MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const UsersAdminModule: FC = (): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col gap-12">
      <MarketBreadcumb
        title="Manajemen Pengguna"
        currentLinkName="Manajemen Pengguna"
        currentLinkUrl="/admin/users"
        prevLinkName="Home"
        prevLinkUrl="/admin"
      />
    </div>
  );
};
