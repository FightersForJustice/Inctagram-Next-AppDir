import type { Meta, StoryObj } from '@storybook/react';

import Page from './page';
import { useTranslations } from 'next-intl';

import {
  ReduxStoreProviderDecorator,
  ThemeDecorator,
} from '@/decorators/storybookDecorators';

// const t = useTranslations('SignInPage')

const meta = {
  component: Page,
  tags: ['autodocs'],
  title: 'components/auth/signIn',
  decorators: [
    ReduxStoreProviderDecorator,
    ThemeDecorator,
    (Story) => (
      
      <div style={{ margin: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
