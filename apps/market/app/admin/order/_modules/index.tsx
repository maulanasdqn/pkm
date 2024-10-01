import { MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';

export const OrderAdminModule: FC = (): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col gap-12">
      <MarketBreadcumb
        title="Order"
        currentLinkName="Order"
        currentLinkUrl="/admin/order"
        prevLinkName="Home"
        prevLinkUrl="/admin"
      />
    </div>
  );
};
