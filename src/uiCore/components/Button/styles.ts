import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IButtonProps } from './Button';

export const styles: StyleRulesCallback<Theme, IButtonProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    padding: '0 30px',
    borderRadius: '5px',
    color: theme.palette.gray.dark,
    margin: '5px',
  } as CSSProperties,
  sm: { height: '30px', fontSize: '12px', padding: '10px 16px' },
  md: { height: '40px', fontSize: '14px', padding: '11px 20px' },
  lg: { height: '50px', fontSize: '16px', padding: '12px 24px' },
  primary: {
    color: theme.palette.green.accentLight,
    backgroundColor: theme.palette.green.primary,
  },
  secondary: {
    color: theme.palette.green.primary,
    backgroundColor: theme.palette.green.category,
  },
  tertiary: {
    color: theme.palette.gray.dark,
    backgroundColor: theme.palette.gray.divider,
  },
  // change to theme colors once decided
  danger: {
    color: theme.palette.white,
    backgroundColor: '#f53649',
  },
  ghost: {},
  loading: {
    pointerEvents: 'none',
  },
  content: {},
  disabled: {
    color: theme.palette.green.accentLight,
    backgroundColor: theme.palette.green.primary,
    pointerEvents: 'none',
    opacity: 0.5,
  },
});
