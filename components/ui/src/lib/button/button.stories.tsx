import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  title: 'components/UI/Button',
  argTypes: {
    variant: {
      options: [
        'primary',
        'secondary',
        'text',
        'yellowPrimary',
        'yellowSecondary',
        'yellowText',
      ],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
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
    children: <ButtonChildren />,
  },
};

export const SecondaryVariant: Story = {
  args: {
    variant: 'secondary',
    children: <ButtonChildren />,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: <ButtonChildren />,
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
    children: <ButtonChildren />,
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: <ButtonLoadingChildren />,
  },
};

export const SecondaryColor: Story = {
  args: {
    variant: 'yellowPrimary',
    children: <ButtonChildren />,
  },
};
function ButtonLoadingChildren() {
  return (
    <>
      <LoadingOutlined className="animate-spin" />
      Please wait..
    </>
  );
}

function ButtonChildren() {
  return (
    <>
      <CaretDownOutlined />
      Button
      <CaretDownOutlined />
    </>
  );
}
