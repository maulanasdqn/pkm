import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  tags: ['autodocs'],
  title: 'components/UI/Textarea',
  argTypes: {
    variant: {
      options: ['default', 'success', 'info', 'error'],
      control: { type: 'radio' },
    },
    className: {
      control: { type: 'text' },
    },
    dimension: {
      options: ['md', 'lg'],
      control: { type: 'radio' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

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
    errorMessage: 'Something went wrong!',
  },
};
