'use client';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@pkm/ui';
import { FC } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

const chartData = [
  { month: 'January', expense: 250_000, income: 1_000_000 },
  { month: 'February', expense: 340_000, income: 400_000 },
  { month: 'March', expense: 400_000, income: 800_000 },
  { month: 'April', expense: 700_000, income: 300_000 },
  { month: 'May', expense: 700_000, income: 850_000 },
];

const chartConfig = {
  expense: {
    label: 'Pengeluaran',
    color: '#F6DF09',
  },
  income: {
    label: 'Pemasukan',
    color: '#E52E2E',
  },
} satisfies ChartConfig;

export const MoneyChartDashboard: FC = () => {
  return (
    <div className="flex flex-col justify-between w-[32rem] max-h-[420px] h-full bg-white py-6 px-8 rounded-[10px] shadow-md">
      <h4 className="font-roboto text-xl">Jumlah Keuangan</h4>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `${value.toLocaleString('id-ID')}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={100} />
          <Bar dataKey="income" fill="var(--color-income)" radius={100} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
