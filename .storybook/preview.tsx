import React from 'react';
import {CssBaseline} from "@mui/material";
import type { Preview } from "@storybook/react";

import {ThemeProvider} from '../src'
import {DiamondTheme} from '../src'

import {ThemeSwapper} from "./ThemeSwapper";


export const decorators = [
  (Story:any) => {
      return <ThemeProvider theme={DiamondTheme} defaultMode={"light"}>
        <CssBaseline/>
        <ThemeSwapper>
          <div style={{padding: '2em'}}>
            <Story/>
          </div>
        </ThemeSwapper>
      </ThemeProvider>
  },
];

const preview: Preview = {
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
