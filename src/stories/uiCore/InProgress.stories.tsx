import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  InProgress,
  IInProgressProps,
} from '../../uiCore/components/InProgress/InProgress';

export default {
  title: 'Home/InProgress',
  component: InProgress,
  argTypes: {},
} as Meta;

const Template: Story<IInProgressProps> = (args) => <InProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
