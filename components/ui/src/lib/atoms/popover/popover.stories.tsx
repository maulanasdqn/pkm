import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from '../button';

const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['autodocs'],
  title: 'components/ui/Popover',
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Usage: Story = {
  args: {
    children: (
      <Popover>
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    ),
  },
};
