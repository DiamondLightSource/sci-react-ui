import React from "react";
import { CssBaseline } from "@mui/material";
import type { Preview } from "@storybook/react";
import "@fontsource-variable/inter";
import "./storybook.css"; /* Storybook CSS override */
import { ThemeProvider } from "../src";
import { GenericTheme, DiamondTheme, DiamondDSTheme } from "../src";
import { ThemeSwapper, TextLight, TextDark, TextSystem } from "./ThemeSwapper";
import "../src/styles/diamondDS/diamond-ds-roles.css";

const TextThemeBase = "Theme: Generic";
const TextThemeDiamond = "Theme: Diamond";
const TextThemeDiamondDS = "Theme: DiamondDS";

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

  (Story, context) => {
    const selectedTheme = context.globals.theme || TextThemeDiamondDS;
    const selectedThemeMode = context.globals.themeMode || TextSystem;

    return (
      <ThemeProvider
        theme={resolveTheme(selectedTheme)}
        defaultMode={resolveDefaultMode(selectedThemeMode)}
      >
        <CssBaseline />

        <ThemeSwapper context={context}>
          <Story />
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
        title: "Theme Mode",
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
          "Helpers",
          "Theme",
          "Theme/Logos",
          "Theme/Colours",
          "MUI",
          "Components",
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
