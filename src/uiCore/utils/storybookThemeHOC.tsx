import React from "react";
import { Theme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { select } from "@storybook/addon-knobs";
import { theme } from "../components/Provider/theme";

type ThemeObject = { [key: string]: Theme };

const themes: ThemeObject = { theme };
const themeNames = Object.keys(themes);

const HOC: React.FC = ({ children }) => {
  const theme = select("Theme", themeNames, themeNames[0], "Themes");

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
};

export default HOC;
