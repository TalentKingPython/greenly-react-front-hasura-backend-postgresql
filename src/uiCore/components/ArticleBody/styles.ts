import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IArticle } from 'modules/article/types';

export const styles: StyleRulesCallback<Theme, IArticle> = (theme: Theme) => ({
  root: {
    backgroundColor: '#eeeeee',
  },
  paper: {
    backgroundColor: 'white',
    marginTop: '-400px',
    position: 'relative',
    borderRadius: 20,
    border: '2px solid white',
    zIndex: 1,
    padding: 50,
    overflowWrap: 'break-word',

    [theme.breakpoints.down('sm')]: {
      padding: 20,
      borderRadius: 0,
      border: 'none',
    },
  },
  headerImage: {
    opacity: 1,
    zIndex: -1,
    overflowY: 'hidden',
    padding: 0,
    minHeight: 400,
    maxHeight: 500,
    width: '100%',
  },
  header: {
    marginBottom: 24,
  },
  white: {
    color: theme.palette.white,
  },
  green: {
    color: theme.palette.green.category,
  },
  articleText: {
    marginBottom: 24,
    fontSize: 22,
  },
  infoText: {
    fontSize: 16,

    '& svg': {
      verticalAlign: 'middle',
    },
  },
  text: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: '48px',
  },
  upper: {
    textTransform: 'uppercase',
  },
  infoBar: {
    textAlign: 'left',
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    color: theme.palette.green.icon,
  },
  infoContainer: {
    justifyContent: 'space-between',
  },
  wrapperHidden: {
    display: 'hidden',
    border: '1px solid white',
    backgroundColor: 'white',
  },
  editorHidden: {
    backgroundColor: 'white',
    padding: '1rem',
    fontFamily: theme.typography.fontFamily,
    lineHeight: '25px',
    fontWeight: theme.typography.fontWeightRegular,
  } as CSSProperties,
  fontFamily: {
    fontFamily: 'AvenirNext',
  },
});
