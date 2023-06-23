import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid, Container, LinearProgress } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { ArticleCard } from "uiCore/components/ArticleCard/index";
import Typography from "@material-ui/core/Typography";
import { IArticle } from "./Articles";

const GET_TOP_ARTICLES = gql`
  query getFrontpageArticles {
    articles(
      limit: 6
      order_by: { views: desc }
      where: { reviewed: { _eq: true }, deletedAt: { _is_null: true } }
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
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "white",
    },
    textHeader: {
      color: "#07C25E",
      fontWeight: "bold",
      fontFamily: "Avenir Next",
      margin: "25px",
    },
    textPrimary: {
      color: "#008940",
    },
    textSecondary: {
      color: "#4F4F4F",
    },
  })
);

export default function TopArticles() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_TOP_ARTICLES);
  if (error) {
    console.log(error);
    return <p> Theres an error </p>;
  }
  if (loading) {
    return <LinearProgress color="secondary" />;
  }
  const articlesData = data.articles;
  const articles = articlesData.map((article: IArticle) => {
    return (
      <ArticleCard key={`top-articles-${article.id}`} cardData={article} />
    );
  });

  return (
    <div className={classes.root}>
      <Typography className={classes.textHeader} variant={"h4"} align="center">
        Top Articles This Week:
      </Typography>
      <Container maxWidth="xl">
        <Box pb={3}>
          <Grid container spacing={5}>
            {articles}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
