import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  title: 'components/UI/Button',
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['primary', 'secondary', 'text'],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      description: 'Custom className',
      control: { type: 'text' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'icon'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <CaretDownOutlined />
        Button
        <CaretDownOutlined />
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <CaretDownOutlined />
        Button
        <CaretDownOutlined />
      </>
    ),
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: (
      <>
        <CaretDownOutlined />
        Button
        <CaretDownOutlined />
      </>
    ),
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    variant: 'primary',
    children: <CaretDownOutlined />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <CaretDownOutlined />
        Button
        <CaretDownOutlined />
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <LoadingOutlined className="animate-spin" />
        Please wait..
      </>
    ),
  },
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: (
      <>
        <CaretDownOutlined />
        Button
        <CaretDownOutlined />
      </>
    ),
  },
};
