import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EEEEEE',
      display: 'flex',
      padding: '12px',
    },
    buttonHolder: {
      display: 'flex',
      justifyContent: 'center',
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

export default useStyles;
