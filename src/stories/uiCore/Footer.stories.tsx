import React from 'react';
import { Meta } from '@storybook/react';
import { Footer, IFooterProps } from '../../uiCore/components/Footer/Footer';

const meta: Meta = {
  title: 'Home/Footer',
  argTypes: {},
};

export default meta;

export const Primary = ({ variant = 'primary', ...args }: IFooterProps) => (
  <Footer variant={variant} {...args} />
);
