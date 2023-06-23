import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EEEEEE',
      display: 'flex',
      paddingTop: '12px',
    },
    buttonHolder: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '25px',
      paddingBottom: '25px',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    errorText: {
      paddingTop: '50px',
      marginTop: '-20px',
      marginBottom: '50px',
    },
  })
);
