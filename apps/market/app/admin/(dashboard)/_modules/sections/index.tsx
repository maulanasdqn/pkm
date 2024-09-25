import { FC, ReactElement } from 'react';
import { MoneyChartDashboard } from './money-chart';
import { CustomerChartDashboard } from './customer-chart';

export const ChartDashboardSection: FC = (): ReactElement => {
  return (
    <div className="w-full flex justify-between items-center">
      <MoneyChartDashboard />
      <CustomerChartDashboard />
    </div>
  );
};
