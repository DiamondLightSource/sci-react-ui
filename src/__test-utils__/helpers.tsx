import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import { DiamondTheme } from "../themes/DiamondTheme";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

type ThemeProviderPropsWithOptionalTheme = Omit<ThemeProviderProps, "theme"> & Partial<Pick<ThemeProviderProps, "theme">>

export const renderWithProviders = (
  children: React.ReactNode,
  themeOptions?: ThemeProviderPropsWithOptionalTheme,
): RenderResult => {
  return render(
    <ThemeProvider theme={DiamondTheme} {...themeOptions}>
      {children}
    </ThemeProvider>,
  );
};
