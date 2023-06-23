import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  GreenlyLogo,
  IGreenlyLogoProps,
} from '../../uiCore/components/GreenlyLogo/GreenlyLogo';

export default {
  title: 'Home/GreenlyLogo',
  component: GreenlyLogo,
  argTypes: {},
} as Meta;

const Template: Story<IGreenlyLogoProps> = (args) => <GreenlyLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
