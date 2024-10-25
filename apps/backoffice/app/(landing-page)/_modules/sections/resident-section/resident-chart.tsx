'use client';

import { FC, ReactElement } from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartConfig } from './type';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@pkm/ui';

const chartData = [{ month: 'january', man: 1260, woman: 570 }];
const chartConfig = {
  man: {
    label: 'Laki-laki',
    color: '#14793a',
  },
  woman: {
    label: 'Perempuan',
    color: '#98cfff',
  },
} satisfies ChartConfig;

const legendData = [
  {
    label: 'Laki-laki',
    value: chartData[0].man,
    color: chartConfig.man.color,
  },
  {
    label: 'Perempuan',
    value: chartData[0].woman,
    color: chartConfig.woman.color,
  },
];

export const ResidentChart: FC = (): ReactElement => {
  const totalVisitors = chartData[0].man + chartData[0].woman;
  return (
    <div className="w-[20rem] md:w-[40rem] shrink-0 py-3 flex flex-col gap-3 justify-center items-center rounded-md">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <div className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px] min-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={360}
              innerRadius={80}
              outerRadius={130}
              barGap={10}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 2}
                            className="fill-black text-2xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 16}
                            className="fill-neutral-60%"
                          >
                            Total Penduduk
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="man"
                stackId="a"
                cornerRadius={80}
                fill="var(--color-man)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="woman"
                fill="var(--color-woman)"
                stackId="a"
                cornerRadius={80}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </div>
        <div className="flex flex-col">
          {legendData.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div
                className="size-5 rounded"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <p className="text-lg">
                {item.value} Penduduk {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
