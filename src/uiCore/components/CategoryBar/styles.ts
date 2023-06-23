import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ICategoryBarProps } from './constants';

export const styles: StyleRulesCallback<Theme, ICategoryBarProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.gray.primary,
    flexGrow: 1,
    borderTop: '1px solid #eeeeee',
    borderBottom: '3px solid #eeeeee',
    padding: '1px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 12,
    marginRight: 12,

    [theme.breakpoints.down('lg')]: {
      fontSize: 16,
      marginLeft: 5,
      marginRight: 5,
    },
  } as CSSProperties,
  toolbarClassName: {
    minHeight: '45px',
    padding: '0px',
  },
  active: {
    color: '#004621',
    fontWeight: 600,
  },
  scrolledBox: {
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',

    '&::-webkit-scrollbar': {
      height: '6px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'white',
      height: '6px',
      borderBottomRightRadius: '5px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eee',
      borderRadius: '9px',
      height: '6px',
    },
  },
  header: {
    flexGrow: 1,
    display: 'flex',
    minWidth: 940,
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('lg')]: {
      minWidth: 700,
    },
  },
});
