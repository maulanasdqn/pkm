'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@pkm/ui';
import { FC, ReactElement, useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

const chartData = [
  { name: 'tourist', visitors: 275, fill: 'var(--color-tourist)' },
  { name: 'buyer', visitors: 200, fill: 'var(--color-buyer)' },
  { name: 'member', visitors: 287, fill: 'var(--color-member)' },
];
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  tourist: {
    label: 'Pengunjung',
    color: 'hsl(var(--chart-1))',
  },
  buyer: {
    label: 'Pembeli',
    color: 'hsl(var(--chart-2))',
  },
  member: {
    label: 'Pendaftar Produk',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export const CustomerChartDashboard: FC = (): ReactElement => {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-[35rem] max-h-[420px] h-full bg-white py-6 px-8 rounded-[10px] shadow-md">
      <h4 className="font-roboto text-xl">Analisis Pengunjung</h4>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <ChartLegend content={<ChartLegendContent />} />

          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="name"
            innerRadius={70}
            cornerRadius={8}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};
