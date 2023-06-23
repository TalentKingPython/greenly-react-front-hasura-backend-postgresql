import {
  makeStyles,
  Theme,
  Box,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { styles } from './styles';
import classnames from 'classnames';

const useStyles = makeStyles<Theme, IContactFooterProps>(styles);

export interface IContactFooterProps {
  variant: 'primary' | 'secondary';
}

export const ContactFooter = (props: IContactFooterProps) => {
  const classes = useStyles(props);
  const rootClassName = classnames(classes.root);
  const headerClassName = classnames(
    classes.headerText,
    classes.headerTextStyling
  );
  const bodyClassName = classnames(classes.bodyText, classes.bodyTextStyling);

  return (
    <div className={rootClassName}>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography className={headerClassName} align="center">
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={bodyClassName} align="center">
              Send an email to{' '}
              <Link
                href="mailto:ted@greenly.co"
                color="inherit"
                target="_blank"
              >
                ted@greenly.co
              </Link>
              !
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={bodyClassName} align="center">
              Download our press kit{' '}
              <Link
                href="https://firebasestorage.googleapis.com/v0/b/greenly-b5548.appspot.com/o/static%2Fone-pager%2FOnePager.pdf?alt=media&token=bbd0c580-2674-4e85-8ca0-321fcf26bace"
                underline="always"
                color="inherit"
                target="_blank"
              >
                here
              </Link>
              .
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
