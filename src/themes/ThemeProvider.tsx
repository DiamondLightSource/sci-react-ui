import { CssBaseline, GlobalStyles } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  ThemeProviderProps as MuiThemeProviderProps,
} from "@mui/material/styles";
import { DiamondDSTheme } from "./DiamondDSTheme";

interface ThemeProviderProps extends Partial<MuiThemeProviderProps> {
  baseline?: boolean;
}

const ThemeProvider = function ({
  children,
  theme = DiamondDSTheme,
  baseline = true,
  defaultMode = "system",
  ...props
}: ThemeProviderProps) {
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
