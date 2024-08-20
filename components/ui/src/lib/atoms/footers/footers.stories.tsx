import type { Meta, StoryObj } from '@storybook/react';

import { FooterMarket } from './footers';

const meta: Meta<typeof FooterMarket> = {
  component: FooterMarket,
  tags: ['autodocs'],
  title: 'components/UI/Footers/Market',
};

export default meta;
type Story = StoryObj<typeof FooterMarket>;

export const Default: Story = {};
