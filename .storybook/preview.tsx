import React from "react";
import { CssBaseline } from "@mui/material";
import type { Preview } from "@storybook/react";
import "@fontsource-variable/inter";
import "./storybook.css"; /* Storybook CSS override */
import { ThemeProvider } from "../src";
import { DiamondDSTheme } from "../src";
import { ThemeSwapper, TextLight, TextDark } from "./ThemeSwapper";
import "../src/styles/diamondDS/DiamondDSTokens.css";

const TextThemeDiamondDS = "Theme: DiamondDS";

export const decorators = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (StoriesWithPadding: React.FC, context: any) => {
    /* Fixed-position content (for example permanent Drawers) ignores this
       wrapper's padding and stays aligned to the viewport, leaving a visible
       gap beside padded content. 
       Full-page layout stories opt out with this flag. */
    if (context.parameters.fullBleed === true) {
      return <StoriesWithPadding />;
    }
    return (
      <div style={{ padding: "2em" }}>
        <StoriesWithPadding />
      </div>
    );
  },

  (Story, context) => {
    const disableThemeSwapper = context.parameters.disableThemeSwapper === true;
    return (
      <ThemeProvider theme={DiamondDSTheme}>
        <CssBaseline />

        {disableThemeSwapper ? (
          <Story />
        ) : (
          <ThemeSwapper context={context}>
            <Story />
          </ThemeSwapper>
        )}
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
          "Foundations",
          "Foundations/Theme Colours",
          "Foundations/Colour",
          "Foundations/Typography",
          "Foundations/Icons",
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
