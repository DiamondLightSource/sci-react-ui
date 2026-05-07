import { useColorScheme } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";

interface Globals {
  theme: string;
  themeMode: string;
}

interface Context {
  globals: Globals;
}

export interface ThemeSwapperProps {
  context: Context;
  children: React.ReactNode;
}

export const TextLight = "Mode: Light";
export const TextDark = "Mode: Dark";

const ThemeSwapper = ({ context, children }: ThemeSwapperProps) => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    const selectedThemeMode = context.globals.themeMode || TextLight;
    const nextMode = selectedThemeMode === TextLight ? "light" : "dark";

    setMode(nextMode);
    document.documentElement.setAttribute("data-mode", nextMode);
  }, [context.globals.themeMode, setMode]);

  return (
    <div style={{ backgroundColor: mode === "light" ? "#fafafaaa" : "#000a" }}>
      {children}
    </div>
  );
};

export { ThemeSwapper };
export type { Context };