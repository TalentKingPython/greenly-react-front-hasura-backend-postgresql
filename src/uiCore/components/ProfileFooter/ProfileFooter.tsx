import React, { forwardRef } from 'react';
import { LinearProgress } from '@material-ui/core';
import { InProgress } from '../InProgress';
import { gql, useQuery } from '@apollo/client';
import { ArticleCard } from '../ArticleCard/index';

export interface IProfileFooterProps {
  likedArticle: String;
}

const GET_LIKED_ARTICLES = gql`
  query GET_LIKED_ARTICLES($liked: Int!) {
    articles(where: { id: { _eq: $liked } }) {
      user {
        name
      }
      readTime
      title
      headerImage
      dateCreated
      likes
      categories
      articleBody
      views
      authorId
      id
    }
  }
`;

export const ProfileFooter = forwardRef<HTMLElement, IProfileFooterProps>(
  (props, ref) => {
    const { likedArticle } = props;

    const { loading, error, data } = useQuery(GET_LIKED_ARTICLES, {
      variables: { liked: Number(likedArticle) },
    });
    if (likedArticle === '1') {
      return <div />;
    }
    if (error) {
      console.log(error);
      return <InProgress variant="primary" />;
    }
    if (loading) {
      return <LinearProgress color="secondary" />;
    }
    const articlesData = data.articles;

    return <ArticleCard cardData={articlesData[0]} key={articlesData[0]?.id} />;
  }
);
