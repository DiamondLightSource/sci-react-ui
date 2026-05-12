import React from "react";
import type { Preview } from "@storybook/react";

import { ThemeProvider } from "../src";
import { GenericTheme, DiamondTheme, DiamondDSTheme } from "../src";

import {
  Context,
  ThemeSwapper,
  TextDark,
  TextLight,
  TextSystem,
} from "./ThemeSwapper";

const TextThemeBase = "Theme: Generic";
const TextThemeDiamond = "Theme: Diamond";
const TextThemeDiamondDS = "Theme: Diamond DS";

function resolveTheme(selectedTheme: string) {
  switch (selectedTheme) {
    case TextThemeBase:
      return GenericTheme;

    case TextThemeDiamond:
      return DiamondTheme;

    case TextThemeDiamondDS:
    default:
      return DiamondDSTheme;
  }
}

function resolveDefaultMode(selectedThemeMode: string) {
  if (selectedThemeMode === TextLight) return "light";
  if (selectedThemeMode === TextDark) return "dark";

  return "system";
}

export const decorators = [
  (StoriesWithPadding: React.FC) => {
    return (
      <div style={{ padding: "2em" }}>
        <StoriesWithPadding />
      </div>
    );
  },

  (StoriesWithThemeProvider: React.FC, context: Context) => {
    const selectedTheme = context.globals.theme || TextThemeDiamondDS;
    const selectedThemeMode = context.globals.themeMode || TextSystem;

    return (
      <ThemeProvider
        theme={resolveTheme(selectedTheme)}
        defaultMode={resolveDefaultMode(selectedThemeMode)}
      >
        <ThemeSwapper context={context}>
          <StoriesWithThemeProvider />
        </ThemeSwapper>
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
        title: "Theme mode",
        icon: "mirror",
        items: [TextLight, TextDark, TextSystem],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: TextThemeDiamondDS,
    themeMode: TextSystem,
  },

  parameters: {
    controls: {
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
          "Foundation",
          "Helpers",
          "MUI",
          "Components",
          "Theme",
          "Theme/Logos",
          "Theme/Colours",
        ],
      },
    },
  },

  argTypes: {
    linkComponent: {
      control: false,
    },
  },
};

export default preview;
