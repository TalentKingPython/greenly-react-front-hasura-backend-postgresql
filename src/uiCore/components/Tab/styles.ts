import { StyleRulesCallback, Theme } from '@material-ui/core';
import { ITabProps } from './Tab';

export const styles: StyleRulesCallback<Theme, ITabProps> = (theme: Theme) => ({
  root: {
    color: theme.palette.gray.primary,
    '&:hover': { backgroundColor: theme.palette.gray.secondary },
  },
  selected: {
    color: theme.palette.green.primary,
    '&:hover': { backgroundColor: theme.palette.gray.secondary },
  },
});
