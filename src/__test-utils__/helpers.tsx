import { ThemeProvider } from "@mui/material/styles";
import { DiamondTheme } from "../themes/DiamondTheme";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

export const renderWithProviders = (
  ui: React.ReactNode,
  themeOptions?: Omit<ThemeProviderProps, "theme">,
): RenderResult => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider {...themeOptions} theme={DiamondTheme}>
        {children}
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};
