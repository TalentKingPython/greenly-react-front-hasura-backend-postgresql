import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor:"white"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    inputBox: {
      margin: "25px",
    },
    buttonBox: {
      margin:"25px",
      display: "flex",
      justifyContent: "center",
    }
  })
);
