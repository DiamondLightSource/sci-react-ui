import React, { useLayoutEffect, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProviderProps as MuiThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { createMuiTheme } from "./DiamondDSTheme";
import type { DSMode } from "./DiamondDSTheme";

interface ThemeProviderProps extends Partial<MuiThemeProviderProps> {
  baseline?: boolean;
  mode: DSMode; // controlled (source of truth)
}

export function ThemeProvider({
  children,
  baseline = true,
  defaultMode = "system",
  mode,
  ...props
}: ThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    // single source of truth for variables
    root.setAttribute("data-mode", mode);

    // optional: keep classes for convenience, but NOT for variables
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");

    // help UA styles / scrollbars
    root.style.colorScheme = mode;
  }, [mode]);

  const theme = useMemo(() => createMuiTheme(mode), [mode]);
  return (
    <MuiThemeProvider theme={theme} defaultMode={defaultMode} {...props}>
      {baseline && <CssBaseline />}
      {children}
    </MuiThemeProvider>
  );
}
