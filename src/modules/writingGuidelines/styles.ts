import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const getDefaultStyles = (theme: Theme) => {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      padding: '30px 0px 40px 0px',
    } as CSSProperties,
    headerTextStyling: {
      ...theme.typography.h1,
      color: theme.palette.green.primary,
      fontWeight: theme.typography.fontWeightRegular,
    } as CSSProperties,

    bodyText: theme.typography.h5,
    bodyTextStyling: {
      color: theme.palette.green.primary,
      fontWeight: theme.typography.fontWeightRegular,
    } as CSSProperties,
    titleText: {
      fontWeight: theme.typography.fontWeightBold,
    } as CSSProperties,
    mainTitleText: {
      paddingBottom: '50px',
    },
    tagsContainer: {
      marginTop: '20px',
      alignText: 'center',
    },
    tag: {
      color: theme.palette.green.secondary,
      marginTop: '10px',
      marginRight: '20px',
    },
  };
};

export const useGrayStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      padding: '30px 0px 30px 0px',
      backgroundColor: theme.palette.gray.background,
    },
  });
});

export const useWhiteStyles = makeStyles(() => {
  return createStyles({
    root: {
      padding: '30px 0px 30px 0px',
    },
  });
});

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles(getDefaultStyles(theme));
});

export default useStyles;
