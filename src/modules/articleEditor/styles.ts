import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      paddingTop: '30px',
    },
    wrapper: {
      padding: '1rem',
      border: '1px solid #ccc',
      backgroundColor: '#eeeeee',
    },
    editor: {
      backgroundColor: 'white',
      padding: '1rem',
      border: '1px solid #ccc',
      fontFamily: theme.typography.fontFamily,
      lineHeight: '25px',
      fontWeight: theme.typography.fontWeightRegular,
    } as CSSProperties,
    toolbar: {
      border: '1px solid #ccc',
    },
    container: {
      marginBottom: '75px',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    inputBox: {
      marginBottom: '25px',
    },
    inputText: {
      marginTop: '25px',
      marginBottom: '25px',
      fontFamily: 'AvenirNext-DemiBold',
    },
    header: {
      marginBottom: 24,
      fontFamily: 'AvenirNext-Regular',
    },
    headerBox: {
      textAlign: 'center',
    },
    footerBox: {
      paddingTop: '50px',
      paddingBottom: '50px',
      backgroundColor: '#eeeeee',
      display: 'flex',
      justifyContent: 'center',
    },
    fontFamily: {
      fontFamily: 'AvenirNext',
    },
  })
);

export default useStyles;
