import React, { useLayoutEffect } from "react";
import { CssBaseline } from "@mui/material";
import type { Preview } from "@storybook/react";
import "@fontsource-variable/inter";
import "./storybook.css"; /* Storybook CSS override */
import { ThemeProvider } from "../src";
import {
  GenericTheme,
  DiamondTheme,
  DiamondDSTheme,
  DiamondDSThemeDark,
} from "../src";
import { Context, ThemeSwapper, TextLight, TextDark } from "./ThemeSwapper";

const TextThemeBase = "Theme: Generic";
const TextThemeDiamond = "Theme: Diamond";

const TextThemeDiamondDS = "Theme: DiamondDS";

function resolveTheme(selectedTheme: string, mode: "light" | "dark") {
  switch (selectedTheme) {
    case TextThemeBase:
      return GenericTheme;
    case TextThemeDiamondDS:
      return mode === "dark" ? DiamondDSThemeDark : DiamondDSTheme;
    case TextThemeDiamond:
    default:
      return DiamondTheme;
  }
}

function ApplyModeToPreviewDoc({
  mode,
  doc,
}: {
  mode: "light" | "dark";
  doc: Document;
}) {
  useLayoutEffect(() => {
    const root = doc.documentElement; // <html>
    root.setAttribute("data-mode", mode);

    // Optional: keep class too if your CSS supports it
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");

    root.style.colorScheme = mode;
  }, [mode, doc]);

  return null;
}

export const decorators = [
  (StoriesWithPadding: React.FC) => (
    <div style={{ padding: "2em" }}>
      <StoriesWithPadding />
    </div>
  ),
  (StoriesWithThemeSwapping: React.FC, context: Context) => (
    <ThemeSwapper context={context}>
      <StoriesWithThemeSwapping />
    </ThemeSwapper>
  ),
  (StoriesWithThemeProvider: React.FC, context: Context) => {
    const selectedTheme = context.globals.theme || TextThemeBase;
    const selectedThemeMode = context.globals.themeMode || TextLight;
    const mode = selectedThemeMode === TextLight ? "light" : "dark";

    // ensure we target the preview iframe document
    const doc: Document = context?.canvasElement?.ownerDocument ?? document;
    return (
      <ThemeProvider
        theme={resolveTheme(selectedTheme, mode)}
        defaultMode={mode}
      >
        <ApplyModeToPreviewDoc mode={mode} doc={doc} />
        <CssBaseline />
        <StoriesWithThemeProvider />
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "cog",
        items: [TextThemeBase, TextThemeDiamond, TextThemeDiamondDS],
        dynamicTitle: true,
      },
    },
    themeMode: {
      description: "Global theme mode for components",
      toolbar: {
        title: "Theme Mode",
        icon: "mirror",
        items: [TextLight, TextDark],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: TextThemeDiamondDS,
    themeMode: TextLight,
  },
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: "fullscreen",
  },
  argTypes: {
    linkComponent: { control: false },
  },
};

export default preview;
