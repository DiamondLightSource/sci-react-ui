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
    setMode(selectedThemeMode === TextLight ? "light" : "dark");
  }, [context.globals.themeMode, setMode]);

  return (
    <div style={{ backgroundColor: mode === "light" ? "#F6F6F9" : "#0e1017" }}>
      {children}
    </div>
  );
};

export { ThemeSwapper };
export type { Context };
