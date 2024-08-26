import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['autodocs'],
  title: 'components/UI/Alert',
  argTypes: {
    variant: {
      options: ['success', 'warning', 'error'],
      control: { type: 'radio' },
    },
    message: {
      control: { type: 'text' },
    },
    show: {
      control: { type: 'boolean' },
    },
    timer: {
      control: { type: 'number' },
    },
    y: {
      control: { type: 'number' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    message: 'The list has been saved.',
    variant: 'success',
    show: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'Warning message.',
    show: true,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Error message.',
    show: true,
  },
};
