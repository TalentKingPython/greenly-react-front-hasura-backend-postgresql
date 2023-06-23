import { Story, Meta } from '@storybook/react';
import { ArticleCard } from '../../uiCore/components/ArticleCard/ArticleCard';
import { IArticleCardProps } from '../../uiCore/components/ArticleCard/ArticleCard';

export default {
  title: 'Home/ArticleCard',
  component: ArticleCard,
  argTypes: {},
} as Meta;

const Template: Story<IArticleCardProps> = (args) => <ArticleCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  cardData: {
    authorId: '532',
    categories: 'Technology',
    dateCreated: '01-20-2021',
    id: 532,
    readTime: 5,
    title: 'High winds in the polar region cause increase in pigeon migrations',
    headerImage: 'https://picsum.photos/1200/750',
    user: {
      name: 'Sam Driver',
    },
  },
};
