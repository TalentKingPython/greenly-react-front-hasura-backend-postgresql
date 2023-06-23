import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EEEEEE',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    inputBox: {
      margin: '25px',
    },
    buttonBox: {
      textAlign: 'center',
      paddingTop: '25px',
      paddingBottom: '25px',
    },
    title: {
      fontFamily: 'AvenirNext-Regular',
    },
  })
);
