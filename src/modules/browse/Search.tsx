import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ArticleCard } from 'uiCore/components/ArticleCard/index';
import clsx from 'clsx';
import Pagination from '@material-ui/lab/Pagination';
import { useParams } from 'react-router';
import { GET_SEARCH_ARTICLES } from './queries';
import { IArticle } from 'modules/home/Articles';
import { withTopBar } from 'modules/decorators/withTopBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EEEEEE',
      marginTop: '20px',
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

      [theme.breakpoints.down('md')]: {
        paddingTop: '30px',
        marginTop: '-20px',
        marginBottom: '30px',
      },
    },
  })
);

interface SearchParams {
  term: string;
}

function Search() {
  const classes = useStyles();
  const { term } = useParams<SearchParams>();

  const [page, setPage] = React.useState(1);

  const { loading, error, data } = useQuery(GET_SEARCH_ARTICLES, {
    variables: { term: '%' + term + '%', offset: (page - 1) * 36 },
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (error) {
    return <p> {error.message} </p>;
  }
  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  const articleCount = data.articles_aggregate.count;
  const articlesData = data.articles;
  const articles = articlesData.map((article: IArticle) => {
    return <ArticleCard cardData={article} key={article.id} />;
  });

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Typography variant={'h3'} className={clsx(classes.errorText)}>
          {' '}
          Showing results for {term}:{' '}
        </Typography>
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
          {articleCount / 36 <= 1 && (
            <Pagination
              size="large"
              hideNextButton
              count={Math.ceil(articleCount / 36)}
              page={page}
              onChange={handleChange}
            />
          )}
          {articleCount / 36 > 1 && (
            <Pagination
              size="large"
              count={Math.ceil(articleCount / 36)}
              page={page}
              onChange={handleChange}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default withTopBar(Search);
