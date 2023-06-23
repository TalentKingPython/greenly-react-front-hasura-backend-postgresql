import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      color: theme.palette.green.primary,
      fontFamily: theme.typography.fontFamily,
      textAlign: 'center',
    },
    container: {
      padding: '30px 3rem 30px 3rem',
    },
    pageHeader: {
      ...theme.typography.h1,
    },
    sectionHeader: {
      ...theme.typography.h2,
    },
    header: {
      color: theme.palette.green.primary,
      fontWeight: theme.typography.fontWeightRegular,
      marginBottom: '20px',
    } as CSSProperties,
    graySection: {
      backgroundColor: theme.palette.gray.background,
    },
    paragraphContainer: {
      gap: '1rem',
      display: 'flex',
      flexDirection: 'column',
    },
    boldText: {
      fontWeight: theme.typography.fontWeightBold,
    } as CSSProperties,
    link: {
      textDecoration: 'none',
      color: theme.palette.green.secondary,
      '&:hover': {
        textDecoration: 'none',
      },
    },
  });
});
