import { Meta } from '@storybook/react';
import { Tab, ITabProps } from '../../uiCore/components/Tab/Tab';

const meta: Meta = {
  title: 'Home/Tab',
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    selected: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};

export default meta;

export const Primary = ({ ...args }: ITabProps) => (
  <Tab label="Tab" {...args}></Tab>
);
