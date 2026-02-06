import React, { useLayoutEffect, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import type { ThemeProviderProps as MuiThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { createMuiTheme } from "./DiamondDSTheme";
import type { DSMode } from "./DiamondDSTheme";

interface ThemeProviderProps extends Partial<MuiThemeProviderProps> {
  baseline?: boolean;
  mode?: DSMode | "system";
}

function resolveMode(mode: DSMode | "system"): DSMode {
  if (mode !== "system") return mode;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  baseline = true,
  defaultMode = "system",
  mode = "light",
  ...props
}: ThemeProviderProps) {
  const resolvedMode = useMemo(() => resolveMode(mode), [mode]);

  useLayoutEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-mode", resolvedMode);

    // compatibility classes
    root.classList.toggle("dark", resolvedMode === "dark");
    root.classList.toggle("light", resolvedMode === "light");

    // browser-native UI (scrollbars, form controls)
    root.style.colorScheme = resolvedMode;
  }, [resolvedMode]);

  const theme = useMemo(() => createMuiTheme(resolvedMode), [resolvedMode]);

  return (
    <MuiThemeProvider theme={theme} defaultMode={defaultMode} {...props}>
      {baseline && <CssBaseline />}
      {children}
    </MuiThemeProvider>
  );
}
