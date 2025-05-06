import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, ThemeProviderProps } from "./ThemeProvider";

type SciReactUIProviderProps = React.PropsWithChildren<ThemeProviderProps>;

export const SciReactUIProvider: React.FC<SciReactUIProviderProps> = (
  props,
) => {
  return (
    <ThemeProvider {...props}>
      <BrowserRouter> {props.children} </BrowserRouter>
    </ThemeProvider>
  );
};
