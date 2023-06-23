import React, { FC } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme";

interface IProviderProps {
  children?: React.ReactNode;
}

export const Provider: FC<IProviderProps> = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
