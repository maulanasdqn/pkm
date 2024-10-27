'use client';

import { FC, ReactElement } from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartConfig } from './type';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@pkm/ui';

const chartData = [{ month: 'loading...', desktop: 0, mobile: 0 }];
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#14793a',
  },
  mobile: {
    label: 'Mobile',
    color: '#98cfff',
  },
} satisfies ChartConfig;

type TChartData = {
  month: string;
  desktop: number;
  mobile: number;
}[];

export const VisitorChart: FC<{ visitorData: TChartData }> = ({
  visitorData,
}): ReactElement => {
  const totalVisitors = visitorData[0].desktop + visitorData[0].mobile || 0;
  const legendData = [
    {
      label: 'Desktop',
      value: visitorData[0].desktop,
      color: chartConfig.desktop.color,
    },
    {
      label: 'Mobile',
      value: visitorData[0].mobile,
      color: chartConfig.mobile.color,
    },
  ];

  return (
    <div className="w-[40rem] shrink-0 py-3 flex flex-col gap-3 justify-center items-center shadow-md rounded-md bg-white">
      <h1 className="text-xl font-semibold">Pengunjung Bulan Agustus</h1>
      <div className="flex justify-center items-center">
        <div className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px] min-h-[250px]"
          >
            <RadialBarChart
              data={visitorData || chartData}
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
                            Total Pengunjung
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="desktop"
                stackId="a"
                cornerRadius={80}
                fill="var(--color-desktop)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="mobile"
                fill="var(--color-mobile)"
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
                {item.value.toLocaleString()} Pengunjung {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
