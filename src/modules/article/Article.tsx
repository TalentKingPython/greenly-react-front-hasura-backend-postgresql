import { useParams } from 'react-router-dom';
import { ArticleBody } from 'uiCore/components/ArticleBody/index';
import { ArticleFooter } from 'uiCore/components/ArticleFooter/index';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Container, LinearProgress, Typography } from '@material-ui/core';
import { useAuth } from 'modules/firebase/provider/authProvider';
import { Button } from 'uiCore';
import { InProgress } from 'uiCore/components/InProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { IArticle } from './types';
import useProfile from 'modules/hooks/useProfile';
import { GET_ARTICLE_BY_ID } from '../articleEditor/queries';
import { withTopBar } from 'modules/decorators/withTopBar';

export const UPDATE_VIEWS = gql`
  mutation UPDATE_VIEWS($id: Int, $views: Int) {
    update_articles(where: { id: { _eq: $id } }, _set: { views: $views }) {
      returning {
        views
      }
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UPDATE_REVIEW($id: Int) {
    update_articles(where: { id: { _eq: $id } }, _set: { reviewed: true }) {
      affected_rows
    }
  }
`;

interface IArticleParam {
  articleId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EEEEEE',
    },
    submit: {
      paddingBottom: '30px',
      paddingLeft: '45%',
      paddingRight: '45%',
    },
  })
);

const Article = () => {
  const params: IArticleParam = useParams();
  const articleId = params.articleId;
  const currentUser = useAuth();
  const classes = useStyles();

  const [updateViews] = useMutation(UPDATE_VIEWS);
  const [approve] = useMutation(UPDATE_REVIEW);
  let uid;
  if (currentUser?.uid) {
    uid = currentUser?.uid;
  } else {
    uid = '1';
  }

  const userProfile = useProfile(uid, '');
  const isAdmin = userProfile?.data?.users[0]?.role === 'ADMIN';

  const {
    loading: articleLoading,
    error,
    data: articleData,
  } = useQuery(GET_ARTICLE_BY_ID, {
    onCompleted: (data) => {
      updateViews({
        variables: {
          id: Number(articleId),
          views: data.articles[0].views + 1,
        },
      });
    },
    variables: { id: Number(articleId) },
  });

  const submit = (id: string): void => {
    approve({ variables: { id: Number(id) } });
    alert('Article succesfully approved!');
    window.location.reload();
  };

  if (articleLoading) {
    return (
      <div data-testid="article-loading">
        <LinearProgress color="secondary" />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <InProgress variant="primary" />;
  }

  if (
    articleData &&
    articleData.articles?.[0] &&
    (!!articleData.articles[0]?.reviewed || isAdmin)
  ) {
    const article: IArticle = articleData.articles[0];

    return (
      <Box data-testid="article-container" className={clsx(classes.root)}>
        <ArticleBody data={article} currentUser={currentUser} />
        <ArticleFooter authorId={article.user.id} />
        {!article.reviewed && isAdmin && (
          <div className={clsx(classes.submit)} data-testid="approve-button">
            <Button
              variant="primary"
              component="button"
              label="approveButton"
              onClick={() => submit(articleId)}
            >
              Approve
            </Button>
          </div>
        )}
      </Box>
    );
  } else {
    return (
      <Container maxWidth="sm" data-testid="not-found">
        <Typography>
          The article you are looking for does not exist. Please try a new one.{' '}
        </Typography>
      </Container>
    );
  }
};

export default withTopBar(Article);
