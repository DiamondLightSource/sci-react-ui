import { useEffect } from "react";
import { ThemeProvider as Mui_ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { GenericTheme } from "./GenericTheme";
import { ThemeProviderProps as Mui_ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

interface ThemeProviderProps extends Partial<Mui_ThemeProviderProps> {
  baseline?: boolean;
  defaultMode?: "light" | "dark"; // keep it simple
}

const ThemeProvider = function ({
  children,
  theme = GenericTheme,
  baseline = true,
  defaultMode = "light",
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", defaultMode);
  }, [defaultMode]);

  return (
    <Mui_ThemeProvider theme={theme} {...props}>
      {baseline && <CssBaseline />}
      {children}
    </Mui_ThemeProvider>
  );
};

export { ThemeProvider };
export type { ThemeProviderProps };
