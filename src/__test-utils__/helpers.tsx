import { ThemeProvider } from "@mui/material/styles";
import { DiamondTheme } from "../themes/DiamondTheme";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

export const renderWithProviders = (
  children: React.ReactNode,
  themeOptions?: ThemeProviderProps,
): RenderResult => {
  return render(
    <ThemeProvider theme={DiamondTheme} {...themeOptions}>
      {children}
    </ThemeProvider>
  );
};
