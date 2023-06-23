import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Navbar, INavbarProps } from '../../uiCore/components/Navbar/Navbar';

export default {
  title: 'Home/Navbar',
  component: Navbar,
  argTypes: {},
} as Meta;

const Template: Story<INavbarProps> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
