import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  title: 'components/UI/Button',
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'gradient'],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
    suspense: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Learn More',
    className: 'w-[200px]',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Contact Us',
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Learn More',
  },
};

export const Suspense: Story = {
  args: {
    suspense: true,
    variant: 'primary',
    children: 'Learn More',
  },
};
