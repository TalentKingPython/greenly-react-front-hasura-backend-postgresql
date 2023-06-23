import React, { useEffect, useState } from 'react';

import {
  Box,
  Grid,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import { useQuery } from '@apollo/client';
import { ArticleCard } from 'uiCore/components/ArticleCard/index';
import { usePagination } from 'modules/hooks/usePagination/usePagination';
import classnames from 'classnames';
import { useStyles } from './styles';
import { GET_FRONT_PAGE_ARTICLES } from './queries';

export interface IArticle {
  authorId: string;
  categories: string;
  dateCreated: string;
  id: number;
  readTime: number;
  title: string;
  headerImage: string;
  user: {
    name: string;
  };
}

const ITEMS_PER_PAGE = 9;

export default function Articles() {
  const classes = useStyles();

  const [articles, setArticles] = useState<JSX.Element[]>([]);

  const { loading, error, data } = useQuery(GET_FRONT_PAGE_ARTICLES, {
    variables: { offset: 0 },
  });

  const { currentData, currentPage, jump, maxPage } = usePagination({
    data: data?.articles || [],
    pageSize: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (currentData.length === 0) {
      jump(1);
    }

    if (currentData.length > 0) {
      const articles = currentData.map((article: IArticle) => {
        return (
          <ArticleCard
            key={article?.id ? article.id : Math.random().toString()}
            cardData={article}
          />
        );
      });
      setArticles(articles);
    }
  }, [currentData, jump]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    jump(value);
  };

  if (error) {
    return <p> {error} </p>;
  }
  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Box pb={3}>
          {currentData.length === 0 && (
            <Typography
              variant={'h3'}
              className={classnames(classes.errorText)}
            >
              {' '}
              There are no articles here, try an earlier page!{' '}
            </Typography>
          )}
          <Grid container spacing={3}>
            {articles}
          </Grid>
        </Box>
        <div className={classnames(classes.buttonHolder)}>
          <Pagination
            size="large"
            count={maxPage}
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </Container>
    </div>
  );
}
