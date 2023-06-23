import { makeStyles, Theme, Button } from '@material-ui/core';
import { styles } from './styles';
import { useState, forwardRef } from 'react';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import clsx from 'clsx';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from '../../../modules/firebase/provider/authProvider';
import { AuthModal } from '../AuthModal';

const useStyles = makeStyles<Theme, IButtonProps>(styles);

export interface IButtonProps {
  userId: string | undefined;
  articleId: string;
}

export const GET_USER_BY_ID = gql`
  query GET_USER_BY_ID($id: String!) {
    users(where: { id: { _eq: $id } }) {
      likedArticles
    }
  }
`;

export const UPDATE_LIKES = gql`
  mutation UpdateLikes($id: String!, $likedArticles: _varchar!) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { likedArticles: $likedArticles }
    ) {
      affected_rows
    }
  }
`;

export const LikeButton = forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const { userId, articleId } = props;
    const classes = useStyles(props);

    const [itsLiked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);

    function handleChange(current: boolean): boolean {
      if (current === true) {
        refetch();
        return false;
      } else refetch();
      return true;
    }

    const user = useAuth();

    const [likeArticle] = useMutation(UPDATE_LIKES, {
      onCompleted: (data) => setLiked(handleChange(itsLiked)),
    });

    const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
      variables: { id: userId || '' },
    });

    const likedArticles = data?.users[0]?.likedArticles;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (error) {
      console.log(error);
      return (
        <Button
          role="button"
          className={classes.root}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => setLiked}
        >
          <StarBorder className={clsx(classes.liked)}></StarBorder>
        </Button>
      );
    }
    if (loading) {
      return (
        <Button
          role="button"
          className={classes.root}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => setLiked}
        >
          <StarBorder className={clsx(classes.liked)} />
        </Button>
      );
    }

    if (userId === undefined || user === null) {
      return (
        <AuthModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
        >
          <StarBorder
            aria-hidden="false"
            role="button"
            className={clsx(classes.liked)}
          ></StarBorder>
        </AuthModal>
      );
    } else if (!likedArticles) {
      const liked = '{' + String(articleId) + '}';
      return (
        <Button
          role="button"
          className={classes.root}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() =>
            likeArticle({ variables: { id: userId, likedArticles: liked } })
          }
        >
          <StarBorder className={clsx(classes.liked)} />
        </Button>
      );
    } else if (likedArticles.includes(String(articleId)) || itsLiked === true) {
      let liked = JSON.parse(JSON.stringify(data?.users[0]?.likedArticles));
      liked = liked.filter((item: string) => item !== String(articleId));
      return (
        <Button
          aria-hidden="false"
          role="button"
          className={classes.root}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() =>
            likeArticle({
              variables: {
                id: userId,
                likedArticles: '{' + String(liked) + '}',
              },
            })
          }
        >
          <Star className={clsx(classes.liked)} />
        </Button>
      );
    } else {
      const liked = JSON.parse(JSON.stringify(likedArticles));
      liked.push(String(articleId));

      return (
        <Button
          aria-hidden="false"
          role="button"
          className={classes.root}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() =>
            likeArticle({
              variables: {
                id: userId,
                likedArticles: '{' + String(liked) + '}',
              },
            })
          }
        >
          <StarBorder className={clsx(classes.liked)}></StarBorder>
        </Button>
      );
    }
  }
);
