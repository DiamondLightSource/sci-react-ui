import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { GenericTheme } from "./GenericTheme";
import { ThemeProviderProps as MuiThemeProviderProps } from "@mui/material/styles";

interface ThemeProviderProps extends Partial<MuiThemeProviderProps> {
  baseline?: boolean;
}

const ThemeProvider = function ({
  children,
  theme = GenericTheme,
  baseline = true,
  defaultMode = "system",
  ...props
}: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme} defaultMode={defaultMode} {...props}>
      {baseline && <CssBaseline />}
      {children}
    </MuiThemeProvider>
  );
};

export { ThemeProvider };
export type { ThemeProviderProps };
