import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IButtonProps } from '../LikeButton/LikeButton';

export const styles: StyleRulesCallback<Theme, IButtonProps> = (
  theme: Theme
) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    padding: '0',
    borderRadius: '5px',
    color: theme.palette.gray.dark,
    margin: '5px',
    minWidth: 'unset',
  } as CSSProperties,
  liked: {
    fill: '#A5ED8C',
    margin: '0',
  },
  clapCount: {
    color: theme.palette.green.icon,
    verticalAlign: 'sub',
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 300,
    width: '100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 0 10px rgba(0,0,0,.5)',
    borderRadius: 10,
    height: 200,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: theme.palette.green.secondary,
    border: `1px solid ${theme.palette.green.secondary}`,
    marginTop: 10,
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.green.secondary,
      backgroundColor: theme.palette.common.white,
    },
  },
});
