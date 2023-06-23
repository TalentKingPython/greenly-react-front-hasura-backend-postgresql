import {
  makeStyles,
  Theme,
  ButtonBase,
  CircularProgress,
} from '@material-ui/core';
import { styles } from './styles';
import React, { forwardRef } from 'react';
import classnames from 'classnames';

const useStyles = makeStyles<Theme, IButtonProps>(styles);

export interface IButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  component: React.ElementType;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  testId?: string;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const {
      variant,
      disabled = false,
      size = 'lg',
      loading = false,
      fullWidth = false,
      children,
      component = 'button',
      testId = 'button',
      ...rest
    } = props;
    const classes = useStyles(props);
    const rootClassName = classnames(
      {
        [classes.fullWidth]: fullWidth,
        [classes.disabled]: loading,
      },
      classes.root,
      classes[size],
      classes[variant]
    );

    return (
      <ButtonBase
        classes={{ root: rootClassName }}
        component={component}
        disabled={disabled}
        loading={loading.toString()}
        {...rest}
        ref={ref}
        data-testid={testId}
      >
        {loading ? <CircularProgress /> : children}
      </ButtonBase>
    );
  }
);
