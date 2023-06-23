import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  AuthorCard,
  IAuthorCardProps,
} from '../../uiCore/components/AuthorCard/AuthorCard';

export default {
  title: 'Home/AuthorCard',
  component: AuthorCard,
  argTypes: {},
} as Meta;

const Template: Story<IAuthorCardProps> = (args) => <AuthorCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  data: {
    id: 532,
    name: 'Beverly Law',
    username: 'BevLawWrites',
    bio: 'Contributor to Slate, CrowdMatch, and Eco Online. My opinions are my own. I believe in the green revolution!',
    profilePicture: 'https://picsum.photos/id/237/200/300',
    profileLink: 'https://matthewquerdasi.com/',
  },
};
