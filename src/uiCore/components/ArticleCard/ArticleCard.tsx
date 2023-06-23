import { forwardRef } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { Link, Box, Grid, Container } from '@material-ui/core';
import { styles } from './styles';
import { LikeButton } from '../LikeButton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import dateCalculator from '../../../utils/dateCalculator/dateCalculator';
import classnames from 'classnames';
import { useAuth } from '../../../modules/firebase/provider/authProvider';
import { Link as RouterLink } from 'react-router-dom';
import { IArticle } from 'modules/home/Articles';
import { getCDNUrl } from 'modules/firebase/services/storage/storage';

const useStyles = makeStyles<Theme, IArticleCardProps>(styles);

export interface IArticleCardProps {
  cardData: IArticle;
}

export const ArticleCard = forwardRef<HTMLElement, IArticleCardProps>(
  (props, _) => {
    const classes = useStyles(props);
    const rootClassName = classnames(classes.root);
    const authorTextClassName = classnames(classes.upper, classes.authorText);
    const titleTextClassName = classnames(classes.titleText);
    const detailTextClassName = classnames(classes.detailTextStyling);
    const categoryText = classnames(
      classes.categoryText,
      classes.categoryTextStyling,
      classes.green
    );
    const infoContainer = classnames(classes.infoContainer);
    const user = useAuth();

    const { cardData } = props;

    if (!cardData) {
      return null;
    }

    const cdnUrl = cardData.headerImage
      ? getCDNUrl(cardData.headerImage, 400, 225, 'articleCardHeader')
      : 'https://picsum.photos/id/11/400/225';

    return (
      <Grid
        className={rootClassName}
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        key={cardData?.id}
        data-testid={`articleCard-${cardData.id}`}
      >
        <Card elevation={4} className={classes?.card}>
          <Link
            component={RouterLink}
            color="inherit"
            to={`/articles/${cardData.id}`}
          >
            <CardMedia
              component="img"
              height={225}
              image={cdnUrl}
              className={classes.media}
              alt={`${cardData.title} header image`}
            />
          </Link>
          <Box>
            <CardContent
              className={clsx(
                classes.paddingZero,
                classes.overlay,
                classes.white,
                classes.articleText
              )}
            >
              <Container className={classes.containerStyle}>
                <Typography
                  className={authorTextClassName}
                  variant={'subtitle1'}
                  gutterBottom
                  align="left"
                >
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={`/user/${String(cardData?.authorId)}`}
                  >
                    {' '}
                    {cardData?.user.name}{' '}
                  </Link>
                </Typography>
                <Typography
                  className={titleTextClassName}
                  variant={'h5'}
                  gutterBottom
                  align="left"
                >
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={`/articles/${cardData.id}`}
                  >
                    {' '}
                    {cardData.title}{' '}
                  </Link>
                </Typography>
              </Container>
            </CardContent>
          </Box>

          <Box mx={2}>
            <Grid container className={infoContainer} alignItems="center">
              <Grid item xs={4}>
                <Link
                  component={RouterLink}
                  color="inherit"
                  to={`/browse/${String(cardData?.categories)}`}
                >
                  <Typography className={categoryText}>
                    {cardData?.categories.charAt(0).toUpperCase() +
                      cardData?.categories.slice(1)}
                  </Typography>
                </Link>
              </Grid>

              <Grid item xs={7}>
                <Typography
                  className={detailTextClassName}
                  variant="body2"
                  color="textSecondary"
                  noWrap
                >
                  {dateCalculator(cardData?.dateCreated)} &middot;{' '}
                  {cardData?.readTime} min read
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <LikeButton
                  userId={user?.uid}
                  articleId={String(cardData?.id)}
                />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    );
  }
);
