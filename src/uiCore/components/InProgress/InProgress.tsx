import {
  makeStyles,
  Theme,
  Box,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { styles } from './styles';
import React, { forwardRef } from 'react';
import classnames from 'classnames';

// import { ReactComponent as CoffeeIcon } from './public/images/coffee-689.svg';

const useStyles = makeStyles<Theme, IInProgressProps>(styles);

export interface IInProgressProps {
  variant?: 'primary' | 'secondary';
}

export const InProgress = forwardRef<HTMLElement, IInProgressProps>(
  (props, ref) => {
    const classes = useStyles(props);
    const rootClassName = classnames(classes.root);
    const headerClassName = classnames(
      classes.headerText,
      classes.headerTextStyling
    );
    const bodyHeaderClassName = classnames(
      classes.bodyText,
      classes.bodyHeaderTextStyling
    );
    const bodyClassName = classnames(classes.bodyText, classes.bodyTextStyling);
    const coffeeIcon = classnames(classes.coffeeIcon);

    // Coffee icon svg code
    const CoffeeIcon = () => {
      return (
        <svg
          role="img"
          className={coffeeIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="270"
          height="270"
          viewBox="0 0 270 270"
        >
          <g fill="none" fillRule="evenodd">
            <g fill="#B6B6B6">
              <path
                d="M735.423 548.998c8.396 0 15.21-6.72 15.21-15V489c0-8.28-6.814-15-15.21-15-8.397 0-15.212 6.72-15.212 15v44.999c0 8.28 6.815 15 15.212 15zm182.535 60h-30.423v44.998h30.423c35.488 0 35.488-44.999 0-44.999zm-60.845 0h-106.48c-8.396 0-15.21 6.719-15.21 14.999v27.42c0 31.334 23.227 59.323 54.867 62.293 36.294 3.42 66.823-24.63 66.823-59.714v-44.999zm60.845 74.997h-35.732c-13.674 38.085-52.478 64.44-96.834 59.384C738.89 738.07 705 697.015 705 650.846v-41.849c0-16.575 13.614-30 30.423-30h182.535c76.056 0 76.056 104.998 0 104.998zm-60.845-134.997c8.396 0 15.21-6.72 15.21-15V489c0-8.28-6.814-15-15.21-15-8.397 0-15.212 6.72-15.212 15v44.999c0 8.28 6.815 15 15.212 15zm-76.057-15V489c0-8.28 6.815-15 15.212-15 8.396 0 15.21 6.72 15.21 15v44.999c0 8.28-6.814 15-15.21 15-8.397 0-15.212-6.72-15.212-15z"
                transform="translate(-705 -474)"
              />
            </g>
          </g>
        </svg>
      );
    };

    return (
      <div className={rootClassName}>
        <Box display="flex" justifyContent="center">
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography className={headerClassName} align="center">
                We are still working on this page!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={bodyHeaderClassName} align="center">
                For our press kit, check out our{' '}
                <Link href="/about" color="inherit" target="_blank">
                  'About Us'
                </Link>{' '}
                page.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography className={bodyClassName} align="center">
                For all other specific questions, email{' '}
                <Link
                  href="mailto:ted@greenly.co"
                  color="inherit"
                  target="_blank"
                >
                  ted@greenly.co
                </Link>
                .
              </Typography>
            </Grid>
            <Grid container xs={12} md={8}>
              <CoffeeIcon />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
);
