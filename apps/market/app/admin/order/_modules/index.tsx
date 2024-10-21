import { MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { OrdersTable } from './data.table';
import { getAllOrders } from '@pkm/libs/actions/market';
import { columns } from './column';

export const OrderAdminModule: FC = async (): Promise<ReactElement> => {
  const orders = await getAllOrders();

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <MarketBreadcumb
        title="Order"
        currentLinkName="Order"
        currentLinkUrl="/admin/order"
        prevLinkName="Home"
        prevLinkUrl="/admin"
      />

      <OrdersTable data={orders?.data} columns={columns} />
    </div>
  );
};
