import {
  makeStyles,
  Theme,
  Container,
  Box,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { styles } from './styles';
import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles<Theme, IFooterProps>(styles);

export interface IFooterProps {
  variant?: 'primary' | 'secondary';
}

export const Footer = forwardRef<HTMLElement, IFooterProps>((props, _) => {
  const classes = useStyles(props);
  const rootClassName = classnames(classes.root);
  const iconClassName = classes.icon;
  const circleClassName = classes.circle;
  const textClassName = classes.text;

  return (
    <div className={rootClassName}>
      <Container>
        <Box pt={5} pb={6}>
          <Box>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="https://www.facebook.com/webelieveingreen"
                  target="_blank"
                >
                  <div className={circleClassName}>
                    <FacebookIcon className={iconClassName} />
                  </div>
                </Link>
              </Grid>

              <Grid item>
                <Link href="https://twitter.com/greenly_co" target="_blank">
                  <div className={circleClassName}>
                    <TwitterIcon className={iconClassName} />
                  </div>
                </Link>
              </Grid>

              <Grid item>
                <Link
                  href="https://www.linkedin.com/company/greenlyco/"
                  target="_blank"
                >
                  <div className={circleClassName}>
                    <LinkedInIcon className={iconClassName} />
                  </div>
                </Link>
              </Grid>

              <Grid item>
                <Link
                  href="https://www.instagram.com/greenly_co/"
                  target="_blank"
                >
                  <div className={circleClassName}>
                    <InstagramIcon className={iconClassName} />
                  </div>
                </Link>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography className={textClassName}>
                  <Link component={RouterLink} to="/about" color="inherit">
                    About Us
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
});
