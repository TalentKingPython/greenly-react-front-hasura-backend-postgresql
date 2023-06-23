import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: theme.palette.white,
    } as CSSProperties,
    headerText: theme.typography.h1,
    headerTextStyling: {
      color: theme.palette.green.primary,
      fontWeight: theme.typography.fontWeightRegular,
      padding: '30px 0px 30px 0px',
    } as CSSProperties,
    bodyText: theme.typography.h5,
    bodyTextStyling: {
      color: theme.palette.green.primary,
      fontWeight: theme.typography.fontWeightRegular,
      padding: '0px 0px 60px 0px',
    } as CSSProperties,
  })
);

export default useStyles;
