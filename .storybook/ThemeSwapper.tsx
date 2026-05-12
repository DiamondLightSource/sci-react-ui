import { useColorScheme } from "@mui/material/styles";
import * as React from "react";

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
export const TextSystem = "Mode: System";

const ThemeSwapper = ({ context, children }: ThemeSwapperProps) => {
  const { mode, systemMode, setMode } = useColorScheme();

  React.useEffect(() => {
    const selectedThemeMode = context.globals.themeMode || TextSystem;

    if (selectedThemeMode === TextLight) {
      setMode("light");
      return;
    }

    if (selectedThemeMode === TextDark) {
      setMode("dark");
      return;
    }

    setMode("system");
  }, [context.globals.themeMode, setMode]);

  const resolvedMode = mode === "system" ? systemMode : mode;

  return (
    <div
      style={{
        backgroundColor: resolvedMode === "dark" ? "#0e1017" : "#F6F6F9",
      }}
    >
      {children}
    </div>
  );
};

export { ThemeSwapper };
export type { Context };
