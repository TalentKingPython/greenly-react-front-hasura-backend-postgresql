import { Box, Grid, Link, Typography } from '@material-ui/core';
import classnames from 'classnames';
import useStyles from './styles';

export const Contribute = () => {
  const classes = useStyles();
  const headerClassNames = classnames(
    classes.headerText,
    classes.headerTextStyling
  );
  const bodyClassNames = classnames(classes.bodyText, classes.bodyTextStyling);

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography className={headerClassNames} align="center">
              Contribute to Greenly!
            </Typography>
            <Typography className={bodyClassNames} align="center">
              Got something to share?
            </Typography>
            <Typography className={bodyClassNames} align="center">
              Check out our{' '}
              <Link
                href="/writing-guidelines"
                underline="always"
                color="inherit"
              >
                writing guidelines
              </Link>{' '}
              and publish your work on Greenly
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
