import { useColorScheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useRef } from "react";
import { UPDATE_GLOBALS } from "storybook/internal/core-events";
import { addons } from "storybook/internal/preview-api";

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

  // Toolbar → mode. Only runs when the toolbar selection changes, so in-story controls (e.g.
  // ColourSchemeButton) aren't overridden. MUI hands out a new `setMode` on every mode change in
  // development, so it's read from a ref rather than listed as a dependency.
  const setModeRef = useRef(setMode);
  setModeRef.current = setMode;
  const appliedModeRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const targetMode =
      selectedThemeMode === TextLight
        ? "light"
        : selectedThemeMode === TextDark
          ? "dark"
          : "system";
    appliedModeRef.current = targetMode;
    setModeRef.current(targetMode);
  }, [selectedThemeMode]);

  // Mode → toolbar. When an in-story control changes the mode, update the toolbar to match so
  // the two stay in sync.
  const previousModeRef = useRef(mode);

  useEffect(() => {
    const modeChanged = mode !== previousModeRef.current;
    previousModeRef.current = mode;

    if (!modeChanged || mode === appliedModeRef.current) return;
    if (mode !== "light" && mode !== "dark") return;

    appliedModeRef.current = mode;
    addons.getChannel().emit(UPDATE_GLOBALS, {
      globals: { themeMode: mode === "light" ? TextLight : TextDark },
    });
  }, [mode]);

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
