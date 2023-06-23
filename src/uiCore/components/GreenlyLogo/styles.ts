import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IGreenlyLogoProps } from './GreenlyLogo';

export const styles: StyleRulesCallback<Theme, IGreenlyLogoProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
  } as CSSProperties,
  logo: {
    width: '200px',
    paddingTop: '7px',

    [theme.breakpoints.down('lg')]: {
      width: 160,
    },

    [theme.breakpoints.down('md')]: {
      width: 120,
    },

    [theme.breakpoints.down('sm')]: {
      width: 90,
    },
  },
});
