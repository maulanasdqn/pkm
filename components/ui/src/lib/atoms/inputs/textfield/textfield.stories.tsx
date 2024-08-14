import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './textfield';

const meta: Meta<typeof TextField> = {
  component: TextField,
  tags: ['autodocs'],
  title: 'components/UI/TextField',
  argTypes: {
    variant: {
      options: ['default', 'success', 'info', 'error'],
      control: { type: 'radio' },
    },
    type: {
      options: ['text', 'email', 'password'],
      control: { type: 'radio' },
    },
    className: {
      control: { type: 'text' },
    },
    dimension: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    defaultValue: {
      control: { type: 'text' },
    },
    errorMessage: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    variant: 'default',
    className: 'w-[320px]',
    placeholder: 'Label',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    className: 'w-[320px]',
    placeholder: 'Label',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    className: 'w-[320px]',
    placeholder: 'Label',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    className: 'w-[320px]',
    placeholder: 'Label',
    errorMessage: 'Password yang anda masukkan salah!',
  },
};
