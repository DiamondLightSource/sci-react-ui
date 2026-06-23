import { useColorScheme } from "@mui/material/styles";
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
export const TextSystem = "Mode: System";

const ThemeSwapper = ({ context, children }: ThemeSwapperProps) => {
  const { mode, systemMode, setMode } = useColorScheme();

  const selectedThemeMode = context.globals.themeMode ?? TextSystem;

  useEffect(() => {
    const targetMode =
      selectedThemeMode === TextLight
        ? "light"
        : selectedThemeMode === TextDark
          ? "dark"
          : "system";

    if (mode !== targetMode) {
      setMode(targetMode);
    }
  }, [selectedThemeMode, mode, systemMode, setMode]);

  const resolvedMode = mode === "system" ? systemMode : mode;

  return (
    <div
      style={{
        backgroundColor: resolvedMode === "light" ? "#ffffff" : "#161820",
      }}
    >
      {children}
    </div>
  );
};

export { ThemeSwapper };
export type { Context };
