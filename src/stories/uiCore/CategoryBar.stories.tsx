import { Story, Meta } from '@storybook/react';
import { CategoryBar } from '../../uiCore/components/CategoryBar/CategoryBar';
import { ICategoryBarProps } from '../../uiCore/components/CategoryBar/constants';

export default {
  title: 'Home/CategoryBar',
  component: CategoryBar,
  argTypes: {},
} as Meta;

const Template: Story<ICategoryBarProps> = (args) => <CategoryBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
