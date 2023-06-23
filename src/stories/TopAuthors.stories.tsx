import { Story, Meta } from '@storybook/react';
import { TopAuthors } from 'modules/home';
import { TestProvider } from 'testUtils/testUtils';

export default {
  title: 'Home/TopAuthors',
  component: TopAuthors,
  argTypes: {},
} as Meta;

const Template: Story<any> = (args) => (
  <TestProvider>
    <TopAuthors {...args} />
  </TestProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
