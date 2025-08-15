import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import { DiamondTheme } from "../themes/DiamondTheme";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

type ThemeProviderPropsWithOptionalTheme = Omit<ThemeProviderProps, "theme"> &
  Partial<Pick<ThemeProviderProps, "theme">>;

export const addProviders = (
  children: React.ReactNode,
  themeOptions?: ThemeProviderPropsWithOptionalTheme,
) => {
  return (
    <ThemeProvider theme={DiamondTheme} {...themeOptions}>
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
