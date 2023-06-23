import { StyleRulesCallback, Theme } from '@material-ui/core';
import { IArticleFooterProps } from './ArticleFooter';

export const styles: StyleRulesCallback<Theme, IArticleFooterProps> = (
  theme: Theme
) => ({
  paper: {
    backgroundColor: 'white',
    marginTop: '-10%',
    position: 'relative',
    borderRadius: 20,
    border: '2px solid white',
    zIndex: 1,
    padding: 50,
    overflowWrap: 'break-word',
  },
  headerImage: {
    opacity: 1,
    zIndex: -1,
    overflowY: 'hidden',
    marginTop: -24,
    padding: 0,
    maxHeight: 500,
    width: '100%',
  },
  header: {
    fontFamily: 'AvenirNext-DemiBold',
    marginBottom: 24,
    marginTop: 24,
  },
  white: {
    color: theme.palette.white,
  },
  green: {
    color: theme.palette.green.category,
  },
  infoText: {
    marginBottom: 24,
    fontSize: 16,
  },
  text: {
    fontFamily: 'AvenirNext-DemiBold',
  },
  upper: {
    textTransform: 'uppercase',
  },
  icon: {
    color: theme.palette.green.icon,
  },
  articleHolder: {
    paddingTop: 24,
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#EEEEEE',
  },
});
