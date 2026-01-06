import React from "react";
import { CssBaseline } from "@mui/material";
import type { Preview } from "@storybook/react";

import { ThemeProvider } from "../src";
import { GenericTheme, DiamondTheme, DiamondDSTheme } from "../src";

import { Context, ThemeSwapper, TextLight, TextDark } from "./ThemeSwapper";

const TextThemeBase = "Theme: Generic";
const TextThemeDiamond = "Theme: Diamond";
const TextThemeDiamondDS = "Theme: DiamondDS";

function resolveTheme(selectedTheme: string) {
  switch (selectedTheme) {
    case TextThemeBase:
      return GenericTheme;
    case TextThemeDiamondDS:
      return DiamondDSTheme;
    case TextThemeDiamond:
    default:
      return DiamondTheme;
  }
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

    return (
      <ThemeProvider
        theme={resolveTheme(selectedTheme)}
        defaultMode={selectedThemeMode === TextLight ? "light" : "dark"}
      >
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
    theme: TextThemeDiamondDS, // set default to DiamondDS (change if you want)
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
    options: {
      storySort: {
        order: [
          "Introduction",
          "Components",
          "Theme",
          "Theme/Logos",
          "Theme/Colours",
          "Helpers",
        ],
      },
    },
  },
  argTypes: {
    linkComponent: { control: false },
  },
};

export default preview;
