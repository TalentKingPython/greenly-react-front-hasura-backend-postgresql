import { useMemo } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box } from '@mui/material';
import {
  Link,
  Container,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { styles } from './styles';
import clsx from 'clsx';
import dateCalculator from '../../../utils/dateCalculator/dateCalculator';
import { LikeButton } from '../LikeButton';
import { ClapButton } from '../ClapButton';
import { IArticle } from 'modules/article/types';
import { useHistory, useLocation } from 'react-router-dom';
import useProfile from 'modules/hooks/useProfile';
import { useMutation } from '@apollo/client';
import { DELETE_ARTICLE } from 'modules/articleEditor/queries';
import { UPDATE_LIKES } from '../LikeButton/LikeButton';
import { Button } from '../Button';
import firebase from 'firebase/compat/app';
import { getCDNUrl } from 'modules/firebase/services/storage/storage';

export interface IArticleBodyProps {
  data: IArticle;
  currentUser: firebase.User | null;
}

const useStyles = makeStyles<Theme, IArticle>(styles);

export const ArticleBody = ({ data, currentUser }: IArticleBodyProps) => {
  const classes = useStyles(data);
  const history = useHistory();
  const location = useLocation();

  const { data: profileData } = useProfile(currentUser?.uid || '', '');

  const userRole = profileData?.users[0]?.role;

  const isCurrentUserAnAdmin = useMemo(() => {
    return userRole === 'ADMIN';
  }, [userRole]);

  const isUserArticleOwner = useMemo(() => {
    return data?.user?.id === profileData?.users[0]?.id;
  }, [data, profileData]);

  const likedArticles = profileData?.likedArticles;
  const profileUrl = useMemo(() => '/user/' + data.user.id, [data]);

  const onEdit = () => {
    history.push(`/submit/${data?.user?.id}/${data?.id}`);
  };

  const [deleteArticle] = useMutation(DELETE_ARTICLE);
  const [updateLikes] = useMutation(UPDATE_LIKES);

  const onArticleDelete = async () => {
    await deleteArticle({
      variables: {
        id: data?.id,
        deletedAt: new Date(),
      },
    });
    if (likedArticles?.includes(data?.id?.toString())) {
      await updateLikes({
        variables: {
          id: currentUser?.uid,
          likedArticles: `{${likedArticles
            ?.filter((article: string) => article !== data?.id?.toString())
            .join(',')}}`,
        },
      });
    }

    alert('Article has been deleted succesfully.');
    history.push(`/user/${currentUser?.uid}`);
  };

  const abstract = data.abstract;

  const url = data.headerImage
    ? getCDNUrl(data.headerImage, 1200, 500, 'articleHeader')
    : 'https://picsum.photos/id/11/1200/500';

  return (
    <Box className={clsx(classes.root)} data-testid="article-body">
      <Box className={clsx(classes.headerImage)}>
        <img alt="" width={'100%'} height={'100%'} src={url} />
      </Box>
      <Container maxWidth="sm" className={clsx(classes.paper)}>
        <Typography
          className={clsx(classes.text, classes.header)}
          variant={'h1'}
        >
          {data.title}
        </Typography>
        {(isCurrentUserAnAdmin || isUserArticleOwner) &&
          location.pathname.includes('/article') && (
            <Box>
              <Button
                variant="primary"
                component="button"
                label="submitButton"
                onClick={onEdit}
                testId="edit-article-button"
              >
                Edit
              </Button>
              {isCurrentUserAnAdmin && (
                <Button
                  variant="danger"
                  component="button"
                  label="submitButton"
                  onClick={() => {
                    onArticleDelete();
                  }}
                  testId="delete-article-button"
                >
                  Delete
                </Button>
              )}
            </Box>
          )}

        {typeof abstract === 'string' &&
          JSON.parse(abstract).blocks[0].text !== '' && (
            <Editor
              toolbarHidden
              readOnly
              editorState={EditorState.createWithContent(
                convertFromRaw(JSON.parse(abstract))
              )}
              wrapperClassName={clsx(classes.wrapperHidden)}
              editorClassName={clsx(classes.editorHidden)}
            />
          )}
        <Typography className={clsx(classes.infoText)}>
          <Box sx={{ mr: 2 }} component="span">
            By{' '}
            <Link className={classes.green} href={profileUrl}>
              {' '}
              {data.user.name}{' '}
            </Link>{' '}
            - {dateCalculator(data.dateCreated)} - {data.readTime} minute read -{' '}
            {data.views} views
          </Box>
          <LikeButton articleId={data.id} userId={currentUser?.uid} />
          <ClapButton articleId={data.id} userId={currentUser?.uid} />
        </Typography>

        {typeof data.articleBody === 'string' &&
          JSON.parse(data.articleBody).blocks === null && (
            <Typography className={clsx(classes.articleText)}>
              {data.articleBody}
            </Typography>
          )}

        {typeof data.articleBody === 'string' &&
          JSON.parse(data.articleBody).blocks !== null && (
            <Editor
              toolbarHidden
              readOnly
              editorState={EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.articleBody))
              )}
              wrapperClassName={clsx(classes.wrapperHidden)}
              editorClassName={clsx(classes.editorHidden)}
            />
          )}

        {typeof data.articleBody === 'object' && (
          <Editor
            toolbarHidden
            readOnly
            editorState={EditorState.createWithContent(
              convertFromRaw(data.articleBody)
            )}
            wrapperClassName={clsx(classes.wrapperHidden)}
            editorClassName={clsx(classes.editorHidden)}
          />
        )}
      </Container>
    </Box>
  );
};
