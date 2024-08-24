import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  tags: ['autodocs'],
  title: 'components/ui/Calendar',
  argTypes: {
    className: {
      description: 'Custom className',
      control: { type: 'text' },
    },
    classNames: {
      description: 'Custom classNames',
      control: { type: 'text' },
    },
    showOutsideDays: {
      control: { type: 'boolean' },
    },
    showWeekNumber: {
      control: { type: 'boolean' },
    },
    mode: {
      defaultValue: 'single',
      options: ['multiple', 'range', 'single'],
      control: {
        type: 'radio',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Usage: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
  },
};
