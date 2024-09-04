import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOption } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  title: 'components/UI/Select',
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

    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    variant: 'default',
    className: 'w-[320px]',
    placeholder: 'Pilih Opsi',
    children: (
      <>
        <SelectOption value="option-1">Option 1</SelectOption>
        <SelectOption value="option-2">Option 2</SelectOption>
        <SelectOption value="option-3">Option 3</SelectOption>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    className: 'w-[320px]',
    placeholder: 'Pilih Opsi',
    children: (
      <>
        <SelectOption value="option-1">Option 1</SelectOption>
        <SelectOption value="option-2">Option 2</SelectOption>
        <SelectOption value="option-3">Option 3</SelectOption>
      </>
    ),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    className: 'w-[320px]',
    placeholder: 'Pilih Opsi',
    children: (
      <>
        <SelectOption value="option-1">Option 1</SelectOption>
        <SelectOption value="option-2">Option 2</SelectOption>
        <SelectOption value="option-3">Option 3</SelectOption>
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    className: 'w-[320px]',
    placeholder: 'Pilih Opsi',
    errorMessage: 'Something went wrong!',
    children: (
      <>
        <SelectOption value="option-1">Option 1</SelectOption>
        <SelectOption value="option-2">Option 2</SelectOption>
        <SelectOption value="option-3">Option 3</SelectOption>
      </>
    ),
  },
};
