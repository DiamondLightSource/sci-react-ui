import React from "react";

import { ThemeProvider, ThemeProviderProps } from "@mui/material/styles";
import { DiamondDSTheme } from "../themes/DiamondDSTheme";
import { render, RenderResult } from "@testing-library/react";

type ThemeProviderPropsWithOptionalTheme = Omit<ThemeProviderProps, "theme"> &
  Partial<Pick<ThemeProviderProps, "theme">>;

export const addProviders = (
  children: React.ReactNode,
  themeOptions?: ThemeProviderPropsWithOptionalTheme,
) => {
  return (
    <ThemeProvider theme={DiamondDSTheme} {...themeOptions}>
      {children}
    </ThemeProvider>
  );
};

export const renderWithProviders = (
  children: React.ReactNode,
  themeOptions?: ThemeProviderPropsWithOptionalTheme,
): RenderResult => {
  return render(addProviders(children, themeOptions));
};
