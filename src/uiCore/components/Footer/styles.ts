import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IFooterProps } from './Footer';

export const styles: StyleRulesCallback<Theme, IFooterProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,

    backgroundColor: theme.palette.green.category,
    color: theme.palette.green.accentLight,
  } as CSSProperties,
  icon: {
    color: theme.palette.green.accentLight,
    paddingTop: '6px',
    fontSize: '32px',
  },
  circle: {
    width: '45px',
    height: '45px',
    border: 'solid 2.6px ' + theme.palette.green.accentLight,
    borderRadius: '50%',
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: '20px',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.green.accentLight,
  } as CSSProperties,
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});
