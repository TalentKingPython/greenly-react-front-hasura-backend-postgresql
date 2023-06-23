import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { INavbarProps } from './Navbar';

export const styles: StyleRulesCallback<Theme, INavbarProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.gray.primary,
    height: 'auto',
  } as CSSProperties,
  appBarContainer: {},
  navbarText: theme.typography.body2,
  navbarTextStyling: {
    paddingLeft: '15px',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  submitButton: {
    padding: 0,

    [theme.breakpoints.down('sm')]: {
      '&.MuiButtonBase-root': {
        display: 'none',
      },
    },
  },
  submitButtonText: theme.typography.body2,
  submitButtonTextStyling: {
    marginRight: '10px',
    padding: '2px 5px 2px 5px',
    border: '2px solid',
    borderRadius: '5px',
  },
  submitButtonLink: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  icon: {
    color: theme.palette.green.accentLight,
    paddingTop: '6px',
    fontSize: '32px',
  },
  floatRight: {},
  rightContainer: {
    marginLeft: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',

    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      paddingLeft: '10px',
    },
  },
  navbarIcon: {
    color: theme.palette.gray.primary,
    margin: 'auto 10px auto 10px',
  },
  loginText: theme.typography.h6,
  loginPadding: {
    marginLeft: '10px',
  },
  inLineBlock: {
    display: 'inline-block',
  },
  noPadding: {
    padding: '0px',
  },
  dropdownItem: {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
  } as CSSProperties,
  mobileVisible: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
});
