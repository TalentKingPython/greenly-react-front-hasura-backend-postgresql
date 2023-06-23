import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IArticleCardProps } from './ArticleCard';

export const styles: StyleRulesCallback<Theme, IArticleCardProps> = (
  theme: Theme
) => ({
  root: {},
  authorText: theme.typography.caption,
  titleText: theme.typography.h4,
  media: {
    opacity: 1,
    background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
  },
  card: {
    position: 'relative',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: '40px !important',
    color: 'black',
  },
  paddingZero: {
    padding: 0,
  },
  white: {
    color: theme.palette.white,
  },
  green: {
    color: theme.palette.green.category,
  },
  articleText: {
    marginBottom: 0,
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
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
    height: '35px',
  },
  detailTextStyling: {
    marginLeft: '15px',
    fontSize: '12px',
  },
  categoryText: theme.typography.caption,
  categoryTextStyling: {
    fontWeight: theme.typography.fontWeightBold,
  } as CSSProperties,
  containerStyle: {
    paddingLeft: '12px',
    paddingRight: '24px',
  },
});
