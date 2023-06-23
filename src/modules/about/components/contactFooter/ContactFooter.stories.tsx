import { Story, Meta } from '@storybook/react';
import { TestProvider } from 'testUtils/testUtils';
import { ContactFooter, IContactFooterProps } from './ContactFooter';

export default {
  title: 'Home/ContactFooter',
  component: ContactFooter,
  argTypes: {},
} as Meta;

const Template: Story<IContactFooterProps> = (args) => (
  <TestProvider>
    <ContactFooter {...args} />
  </TestProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
