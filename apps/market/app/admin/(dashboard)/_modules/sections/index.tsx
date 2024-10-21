import { FC, ReactElement } from 'react';
import { CustomerChartDashboard } from './customer-chart';
import { CardMarketAdmin } from '@pkm/ui';
import { CreditCardOutlined } from '@ant-design/icons';
import { getAllOrders } from '@pkm/libs/actions/market';
import { OrderStatus } from '@pkm/libs/entities';

export const ChartDashboardSection: FC = async (): Promise<ReactElement> => {
  const totalAmount = await getAllOrders();

  const filteredAmount = totalAmount?.data?.filter((item) => {
    return item.status === OrderStatus.APPROVED;
  });

  const total = filteredAmount?.reduce((acc, curr) => {
    return acc + (curr?.totalPrice || 0);
  }, 0);

  return (
    <div className="w-full flex justify-between">
      <CardMarketAdmin
        className="min-w-[489px] min-h-[218px]"
        Icon={CreditCardOutlined}
        name="Total Seluruh Pemasukan"
        amount={`Rp. ${total.toLocaleString('id-ID')}`}
      />

      <CustomerChartDashboard />
    </div>
  );
};
