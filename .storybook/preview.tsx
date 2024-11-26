import React from 'react';
import {CssBaseline} from "@mui/material";
import type { Preview } from "@storybook/react";

import {ThemeProvider} from '../src'
import {BaseTheme, DiamondTheme} from '../src'

import {ThemeSwapper, TextLight, TextDark} from "./ThemeSwapper";

const TextThemeBase = 'Theme: Base'
const TextThemeDiamond = 'Theme: Diamond'

export const decorators = [
  (StoriesWithPadding:any) => {
    return <div style={{padding: '2em'}}>
      <StoriesWithPadding />
    </div>
  },
  (StoriesWithThemeSwapping:any, context: any) => {
    return <ThemeSwapper context={context}>
      <StoriesWithThemeSwapping/>
    </ThemeSwapper>
  },
  (StoriesWithThemeProvider:any, context:any) => {
    const selectedTheme = context.globals.theme || TextThemeBase;
    const selectedThemeMode = context.globals.themeMode || TextLight;

    return <ThemeProvider
        theme={(selectedTheme == TextThemeBase) ? BaseTheme : DiamondTheme}
        defaultMode={(selectedThemeMode == TextLight) ? "light" : "dark"}
    >
      <CssBaseline/>
      <StoriesWithThemeProvider/>
    </ThemeProvider>
  },
];

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'cog',
        items: [TextThemeBase, TextThemeDiamond],
        dynamicTitle: true,
      },
    },
    themeMode: {
      description: 'Global theme mode for components',
      toolbar: {
        title: 'Theme Mode',
        icon: 'mirror',
        items: [TextLight, TextDark],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'Theme: Diamond',
    themeMode: 'Mode: Light',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
};

export default preview;
