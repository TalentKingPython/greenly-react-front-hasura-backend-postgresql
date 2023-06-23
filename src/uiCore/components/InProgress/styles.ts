import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IInProgressProps } from './InProgress';

export const styles: StyleRulesCallback<Theme, IInProgressProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: theme.palette.gray.background,
  } as CSSProperties,
  headerText: theme.typography.h1,
  headerTextStyling: {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '30px 0px 30px 0px',
  } as CSSProperties,
  bodyText: theme.typography.h5,
  bodyHeaderTextStyling: {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '10px 0px 30px 0px',
  } as CSSProperties,
  bodyTextStyling: {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '0px 0px 60px 0px',
  } as CSSProperties,
  coffeeIcon: {
    margin: 'auto',
    padding: '0px 0px 80px 0px',
  },
});
