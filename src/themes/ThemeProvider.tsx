import * as React from "react";

import { ThemeProvider as Mui_ThemeProvider } from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import { GenericTheme } from "./GenericTheme";
import {ThemeProviderProps as Mui_ThemeProviderProps} from "@mui/material/styles/ThemeProvider";

interface ThemeProviderProps extends Partial<Mui_ThemeProviderProps> {
  baseline?: boolean
}

const ThemeProvider = function ({
    children,
    theme = GenericTheme,
    baseline = true,
    defaultMode = "system",
    ...props
  }: ThemeProviderProps) {
  return (
      <Mui_ThemeProvider theme={theme} defaultMode={defaultMode} {...props}>
        {baseline && <CssBaseline />}
        {children}
      </Mui_ThemeProvider>
  );
};

export { ThemeProvider };
export type { ThemeProviderProps };