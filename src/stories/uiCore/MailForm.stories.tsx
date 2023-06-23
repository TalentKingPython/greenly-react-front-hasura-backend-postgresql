import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  MailForm,
  IMailFormProps,
} from '../../uiCore/components/MailForm/MailForm';

export default {
  title: 'Home/MailForm',
  component: MailForm,
  argTypes: {},
} as Meta;

const Template: Story<IMailFormProps> = (args) => <MailForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
