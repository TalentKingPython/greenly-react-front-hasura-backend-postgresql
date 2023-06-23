import React, { forwardRef } from 'react';
import {
  Grid,
  LinearProgress,
  Box,
  Container,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { styles } from './styles';
import clsx from 'clsx';
import { gql, useQuery } from '@apollo/client';
import { ArticleCard } from '../ArticleCard/index';
import { IArticle } from 'modules/home/Articles';

export interface IArticleFooterProps {
  authorId: string;
}

const useStyles = makeStyles<Theme, IArticleFooterProps>(styles);

export const GET_WRITTEN_ARTICLES = gql`
  query GET_WRITTEN_ARTICLES($authorId: String!) {
    articles(where: { authorId: { _eq: $authorId }, reviewed: { _eq: true } }) {
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

export const ArticleFooter = forwardRef<HTMLElement, IArticleFooterProps>(
  (props, ref) => {
    const { authorId } = props;
    const classes = useStyles(props);

    const { loading, error, data } = useQuery(GET_WRITTEN_ARTICLES, {
      variables: { authorId: authorId },
    });
    if (error) {
      console.log(error);
      return <Typography> Theres an error </Typography>;
    }
    if (loading) {
      return <LinearProgress color="secondary" />;
    }
    const articlesData = data.articles;
    const articles = articlesData.map((article: IArticle) => {
      return <ArticleCard cardData={article} key={article.id} />;
    });

    return (
      <Box className={classes.articleHolder} pb={6}>
        <Typography
          className={clsx(classes.green, classes.header)}
          variant="h1"
        >
          More From This Author
        </Typography>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {articles}
          </Grid>
        </Container>
      </Box>
    );
  }
);
