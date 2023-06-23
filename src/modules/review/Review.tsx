import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { ArticleCard } from 'uiCore/components/ArticleCard/index';
import clsx from 'clsx';
import Pagination from '@material-ui/lab/Pagination';
import { IArticle } from 'modules/home/Articles';

const GET_ARTICLES = gql`
  query getUnreviewedArticles($offset: Int!) {
    articles(
      where: { reviewed: { _eq: false }, deletedAt: { _is_null: true } }
      order_by: { dateCreated: desc }
      limit: 9
      offset: $offset
    ) {
      authorId
      categories
      dateCreated
      id
      readTime
      title
      headerImage
      user {
        name
      }
    }
    articles_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EEEEEE',
    },
    buttonHolder: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '25px',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    errorText: {
      paddingTop: '50px',
      marginTop: '-20px',
      marginBottom: '50px',
    },
    textPrimary: {
      fontFamily: 'Avenir Next',
      color: '#002d15',
      fontSize: '48px',
      marginBottom: '20px',
    },
  })
);

export default function ReviewQueue() {
  const classes = useStyles();

  const [page, setPage] = React.useState(1);

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { offset: (page - 1) * 9 },
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (error) {
    return <p> {error} </p>;
  }
  if (loading) {
    return <LinearProgress color="secondary" />;
  }
  const articleCount = data.articles_aggregate.aggregate.count;
  const articlesData = data.articles;
  const articles = articlesData.map((article: IArticle) => {
    return <ArticleCard cardData={article} key={article.id} />;
  });

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Container maxWidth="sm">
          <Typography
            className={classes.textPrimary}
            variant="h6"
            align="center"
          >
            Articles To Review
          </Typography>
        </Container>
        <Box pb={3}>
          {articles.length === 0 && (
            <Typography variant={'h3'} className={clsx(classes.errorText)}>
              {' '}
              There are no articles here, try an earlier page!{' '}
            </Typography>
          )}
          <Grid container spacing={5}>
            {articles}
          </Grid>
        </Box>
        <div className={clsx(classes.buttonHolder)}>
          {articleCount / 9 <= 1 && (
            <Pagination
              size="large"
              hideNextButton
              count={Math.ceil(articleCount / 9)}
              page={page}
              onChange={handleChange}
            />
          )}
          {articleCount / 9 > 1 && (
            <Pagination
              size="large"
              count={Math.ceil(articleCount / 9)}
              page={page}
              onChange={handleChange}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
