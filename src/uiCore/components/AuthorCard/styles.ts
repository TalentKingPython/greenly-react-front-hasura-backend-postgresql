import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IAuthorCardProps } from './AuthorCard';

export const styles: StyleRulesCallback<Theme, IAuthorCardProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.green.accentLight,
  } as CSSProperties,
  headerText: theme.typography.h3,
  headerTextStyling: {
    color: theme.palette.green.primary,
    marginBottom: '10px',
  },
  secondaryText: theme.typography.body2,
  secondaryTextStyling: {
    color: theme.palette.green.primary,
  },
  bioText: theme.typography.caption,
  bioTextStyling: {
    color: theme.palette.gray.dark,
    marginTop: '12px',
  },

  image: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
  },
  authorCard: {},
});
