import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IMailFormProps } from './MailForm';

export const styles: StyleRulesCallback<Theme, IMailFormProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    maxWidth: '600px',
    margin: 'auto',
  } as CSSProperties,
  headerText: theme.typography.h2,
  headerTextStyling: {
    color: theme.palette.green.secondary,
  },
  formInputStyling: {
    height: '50px',
    width: '100%',
    boxSizing: 'border-box',
    border: 'none',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    '&::placeholder': {
      color: '#002d15',
    },
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  formInputText: theme.typography.body1,
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    margin: 'auto',
    flexGrow: 1,
  },
  submitButton: {
    marginLeft: '-5px',
    maxWidth: 120,

    '& button': { margin: 0, width: '100%' },

    [theme.breakpoints.down('sm')]: {
      maxWidth: 70,
    },
  },
});
