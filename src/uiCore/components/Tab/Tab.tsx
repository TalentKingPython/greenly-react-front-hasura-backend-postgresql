import React, { forwardRef, ReactNode, ReactElement } from "react";
import MUITab, { TabProps } from "@material-ui/core/Tab";
import { makeStyles, Theme } from "@material-ui/core";
import { styles } from "./styles";
import clsx from "clsx";

export interface ITabProps {
  disabled?: boolean;
  value?: TabProps["value"];
  label?: ReactNode;
  icon?: ReactElement;
  selected?: boolean;
  onChange?: TabProps["onChange"];
  onClick?: TabProps["onClick"];
}

const useStyles = makeStyles<Theme>(styles);

export const Tab = forwardRef<HTMLDivElement, ITabProps>((props, ref) => {
  const {
    disabled,
    value,
    label,
    icon,
    selected,
    onChange,
    onClick,
    ...rest
  } = props;
  const classes = useStyles(props);
  const rootClassName = clsx(
    {
      [classes.selected]: selected,
    },
    classes.root
  );
  return (
    <MUITab
      {...rest}
      ref={ref}
      tabIndex={0}
      disabled={disabled}
      label={label}
      icon={icon}
      value={value}
      selected={selected}
      onChange={onChange}
      onClick={onClick}
      classes={{ root: rootClassName }}
    />
  );
});
