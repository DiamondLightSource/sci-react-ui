import React, { useLayoutEffect, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import type { ThemeProviderProps as MuiThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { createMuiTheme } from "./DiamondDSTheme";
import type { DSMode } from "./DiamondDSTheme";

interface ThemeProviderProps extends Partial<MuiThemeProviderProps> {
  baseline?: boolean;
  mode?: DSMode; // 'light' | 'dark' (adding 'system' for future use)
}

export function ThemeProvider({
  children,
  baseline = true,
  defaultMode = "system",
  mode = "light", // default to light mode (for now)
  ...props
}: ThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-mode", mode);
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");
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
