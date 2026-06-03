import React from "react";
import { CssBaseline } from "@mui/material";
import type { Preview } from "@storybook/react";
import "@fontsource-variable/inter";
import "./storybook.css"; /* Storybook CSS override */
import { ThemeProvider } from "../src";
import { DiamondDSTheme } from "../src";
import { ThemeSwapper, TextLight, TextDark, TextSystem } from "./ThemeSwapper";
import "../src/styles/diamondDS/DiamondDSTokens.css";

const TextThemeDiamondDS = "Theme: DiamondDS";

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
    const selectedThemeMode = context.globals.themeMode || TextSystem;

    return (
      <ThemeProvider
        theme={DiamondDSTheme}
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
          "Overview",
          "Installation",
          "Practical Guidance",
          "Working with Components",
          "Helpers",
          "Theme",
          "Theme/Logos",
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
