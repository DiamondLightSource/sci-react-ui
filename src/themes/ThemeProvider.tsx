import * as React from "react";

import { ThemeProvider as Mui_ThemeProvider } from "@mui/material/styles";
import {ThemeProviderProps as Mui_ThemeProviderProps} from "@mui/material/styles/ThemeProvider";

import { BaseTheme } from "./BaseTheme";

const ThemeProvider = function ({
  children,
  theme,
  ...props
}: Mui_ThemeProviderProps) {
  return (
    <Mui_ThemeProvider theme={theme || BaseTheme} {...props}>
      {children}
    </Mui_ThemeProvider>
  );
};

export { ThemeProvider };
