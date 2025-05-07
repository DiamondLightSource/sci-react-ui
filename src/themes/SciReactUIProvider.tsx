import * as React from "react";
import { BrowserRouter, BrowserRouterProps } from "react-router-dom";
import { ThemeProvider, ThemeProviderProps } from "./ThemeProvider";

interface SciReactUIProviderProps
  extends React.PropsWithChildren<ThemeProviderProps> {
  router?: BrowserRouterProps;
}

export const SciReactUIProvider: React.FC<SciReactUIProviderProps> = ({
  children,
  router,
  ...themeProps
}) => {
  return (
    <ThemeProvider {...themeProps}>
      <BrowserRouter {...router}>{children} </BrowserRouter>
    </ThemeProvider>
  );
};
