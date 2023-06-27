import React from 'react';
import { theme } from '../src/uiCore/components/Provider/theme';
import { addDecorator } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { TestProvider } from '../src/testUtils/testUtils';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockedProvider,
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'theme',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['theme1'],
    },
  },
};

addDecorator((story) => <TestProvider theme={theme}>{story()}</TestProvider>);
