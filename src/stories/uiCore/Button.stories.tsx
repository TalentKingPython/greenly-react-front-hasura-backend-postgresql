import React from 'react';
import { Meta } from '@storybook/react';
import { Button, IButtonProps } from '../../uiCore/components/Button/Button';

const meta: Meta = {
  title: 'Home/Button',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      defaultValue: 'md',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};

export default meta;

export const Primary = ({ variant = 'primary', ...args }: IButtonProps) => (
  <Button
    variant={variant}
    {...args}
    onClick={() => {
      alert('click');
    }}
  >
    Primary
  </Button>
);

export const Secondary = ({ variant = 'secondary', ...args }: IButtonProps) => (
  <Button variant={variant} {...args}>
    Secondary
  </Button>
);

export const Tertiary = ({ variant = 'tertiary', ...args }: IButtonProps) => (
  <Button variant={variant} {...args}>
    Tertiary
  </Button>
);

export const Danger = ({ variant = 'danger', ...args }: IButtonProps) => (
  <Button variant={variant} {...args}>
    Danger
  </Button>
);
