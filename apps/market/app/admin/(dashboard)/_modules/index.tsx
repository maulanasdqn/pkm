import {
  CalendarOutlined,
  ContactsOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { CardMarketAdmin, MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { ChartDashboardSection } from './sections';
import {
  getAllOrders,
  getAllProducts,
  getAllUsers,
} from '@pkm/libs/actions/market';

export const DashboardModule: FC = async (): Promise<ReactElement> => {
  const products = await getAllProducts();
  const orders = await getAllOrders();
  const users = await getAllUsers();

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <MarketBreadcumb
        title="Dashboard"
        currentLinkName="Dashboard"
        currentLinkUrl="/admin"
        prevLinkName="Home"
        prevLinkUrl="/admin"
      />

      <div className="flex items-center justify-between">
        <CardMarketAdmin
          name="Produk"
          amount={products?.data?.length}
          Icon={CalendarOutlined}
        />
        <CardMarketAdmin
          name="Order"
          amount={orders?.data?.length}
          Icon={ShoppingCartOutlined}
        />
        <CardMarketAdmin
          name="Pengguna"
          amount={users?.data?.length}
          Icon={ContactsOutlined}
        />
      </div>

      <ChartDashboardSection />
    </div>
  );
};
