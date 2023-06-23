import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  MailFormFooter,
  IMailFormFooterProps,
} from '../../uiCore/components/MailFormFooter/MailFormFooter';

export default {
  title: 'Home/MailFormFooter',
  component: MailFormFooter,
  argTypes: {},
} as Meta;

const Template: Story<IMailFormFooterProps> = (args) => (
  <MailFormFooter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
