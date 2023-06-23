import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IMailFormFooterProps } from './MailFormFooter';

export const styles: StyleRulesCallback<Theme, IMailFormFooterProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,

    backgroundImage:
      'radial-gradient(#e8ffde 20%, transparent 20%), radial-gradient(#FAFAFA 20%, transparent 20%)',
    backgroundColor: theme.palette.green.background,
    backgroundPosition: '0 0, 30px 30px',
    backgroundSize: '30px 30px',
    padding: '35px 16px 60px 16px',
  } as CSSProperties,
  headerText: theme.typography.h2,
  headerTextStyling: {
    color: theme.palette.green.secondary,
    paddingBottom: '35px',

    [theme.breakpoints.down('md')]: {
      fontSize: 28,
      lineHeight: 1.2,
    },
  },
  formInput: {
    height: '50px',
  },
  button: {
    height: '50px',
  },
});
