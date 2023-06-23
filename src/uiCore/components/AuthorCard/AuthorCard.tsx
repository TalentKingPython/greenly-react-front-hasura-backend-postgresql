import { makeStyles, Theme, Grid, Link, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { styles } from './styles';
import { forwardRef } from 'react';
import classnames from 'classnames';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { getCDNUrl } from 'modules/firebase/services/storage/storage';

const useStyles = makeStyles<Theme, IAuthorCardProps>(styles);

export interface IAuthorCardProps {
  variant: 'primary' | 'secondary';
  size: 3 | 4 | 6;
  data: {
    id: number;
    name: string;
    username: string;
    bio: string;
    profilePicture: string;
    profileLink: string;
  };
}

export const AuthorCard = forwardRef<HTMLElement, IAuthorCardProps>(
  (props, ref) => {
    const { size } = props;
    const classes = useStyles(props);
    const rootClassName = classnames(classes.root);
    const headerClassName = classnames(
      classes.headerText,
      classes.headerTextStyling
    );
    const secondaryClassName = classnames(
      classes.secondaryText,
      classes.secondaryTextStyling
    );
    const bioClassName = classnames(classes.bioText, classes.bioTextStyling);
    const imageClassName = classes.image;
    const { data } = props;

    if (!data) {
      return null;
    }

    const cdnUrl = getCDNUrl(
      data.profilePicture,
      90,
      90,
      'userProfileThumbnail'
    );

    return (
      <Grid
        className={rootClassName}
        item
        xs={12}
        sm={6}
        lg={size}
        data-testid={`authorCard-${data.id}`}
      >
        <Card elevation={5} style={{ borderRadius: '10px' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography className={clsx(headerClassName)}>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={`/user/${data.id}`}
                  >
                    {data.name}
                  </Link>
                </Typography>

                <Typography className={secondaryClassName}>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={String(data.profileLink)}
                  >
                    @{data.username}
                  </Link>
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Link
                  component={RouterLink}
                  color="inherit"
                  to={`/user/${data.id}`}
                >
                  <CardMedia
                    className={clsx(imageClassName)}
                    component="img"
                    image={cdnUrl}
                    alt={`${data.name} profile picture`}
                  />
                </Link>
              </Grid>
            </Grid>

            <Typography className={bioClassName}>{data.bio}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
);
