import {
  CalendarOutlined,
  ContactsOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { CardMarketAdmin, MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { ChartDashboardSection } from './sections';

export const DashboardModule: FC = (): ReactElement => {
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
        <CardMarketAdmin name="Produk" amount={25} Icon={CalendarOutlined} />
        <CardMarketAdmin
          name="Produk"
          amount={25}
          Icon={ShoppingCartOutlined}
        />
        <CardMarketAdmin name="Produk" amount={25} Icon={ContactsOutlined} />
      </div>

      <ChartDashboardSection />
    </div>
  );
};
