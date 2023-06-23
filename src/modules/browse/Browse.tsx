import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ArticleCard } from 'uiCore/components/ArticleCard/index';
import classnames from 'classnames';
import Pagination from '@material-ui/lab/Pagination';
import { useParams } from 'react-router';
import useStyles from './styles';
import { GET_CATEGORY_ARTICLES } from './queries';
import { IArticle } from 'modules/home/Articles';
import { withTopBar } from 'modules/decorators/withTopBar';
import { usePagination } from 'modules/hooks/usePagination/usePagination';

const ITEMS_PER_PAGE = 9;
interface BrowseParams {
  category: string;
}

function Browse() {
  const classes = useStyles();
  const params = useParams<BrowseParams>();

  const category = params.category;
  const [articles, setArticles] = useState<JSX.Element[]>([]);

  const { loading, error, data } = useQuery(GET_CATEGORY_ARTICLES, {
    variables: { category, offset: 0 },
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

  const totalArticles = data?.articles.length;

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
            hideNextButton={totalArticles / ITEMS_PER_PAGE <= 1}
            count={maxPage}
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </Container>
    </div>
  );
}

export default withTopBar(Browse);
