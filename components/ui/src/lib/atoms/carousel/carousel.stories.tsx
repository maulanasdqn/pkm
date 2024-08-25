import { Carousel, CarouselContent, CarouselItem } from './carousel';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ['autodocs'],
  title: 'components/ui/Carousel',
  argTypes: {
    showDotNavigator: {
      control: { type: 'boolean' },
    },
    orientation: {
      description:
        'notes: you need to add height at CarouselContent Components if u use vertical orientation! See at Vertical Example below!',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Example: Story = {
  args: {
    opts: {
      align: 'start',
      loop: true,
    },
    className: 'w-full h-full max-w-sm max-h-sm',
    children: (
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="p-1">
              <div className="p-4 border-2 bg-white">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    ),
  },
};

export const ExampleWithDot: Story = {
  args: {
    opts: {
      align: 'start',
      loop: true,
    },
    showDotNavigator: true,
    className: 'w-full max-w-sm',
    children: (
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="p-1">
              <div className="p-4 border-2 bg-white">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    ),
  },
};

export const Vertical: Story = {
  args: {
    opts: {
      align: 'start',
      loop: true,
    },
    orientation: 'vertical',
    className: 'w-full max-w-sm',
    children: (
      <CarouselContent className="-mt-1 h-[300px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <div className="p-4 border-2 bg-white">
                <div className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    ),
  },
};

export const VerticalWithDot: Story = {
  args: {
    opts: {
      align: 'start',
      loop: true,
    },
    orientation: 'vertical',
    showDotNavigator: true,
    className: 'w-full max-w-sm',
    children: (
      <CarouselContent className="-mt-1 h-[300px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <div className="p-4 border-2 bg-white">
                <div className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    ),
  },
};
