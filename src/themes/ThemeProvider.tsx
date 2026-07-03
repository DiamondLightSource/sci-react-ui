import { useEffect, useRef } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  ThemeProviderProps as MuiThemeProviderProps,
} from "@mui/material/styles";
import { DiamondDSTheme } from "./DiamondDSTheme";

interface ThemeProviderProps extends Partial<MuiThemeProviderProps> {
  baseline?: boolean;
  modeTransitionSuppressionMs?: number;
}

const ThemeProvider = function ({
  children,
  theme = DiamondDSTheme,
  baseline = true,
  defaultMode = "system",
  modeTransitionSuppressionMs = 250,
  ...props
}: ThemeProviderProps) {
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      root.classList.add("ds-mode-changing");

      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        root.classList.remove("ds-mode-changing");
        timeoutRef.current = undefined;
      }, modeTransitionSuppressionMs);
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }

      root.classList.remove("ds-mode-changing");
    };
  }, [modeTransitionSuppressionMs]);

  return (
    <MuiThemeProvider theme={theme} defaultMode={defaultMode} {...props}>
      {baseline && <CssBaseline />}

      <GlobalStyles
        styles={{
          "html.ds-mode-changing *, html.ds-mode-changing *::before, html.ds-mode-changing *::after":
            {
              transition: "none !important",
            },
        }}
      />

      {children}
    </MuiThemeProvider>
  );
};

export { ThemeProvider };
export type { ThemeProviderProps };
