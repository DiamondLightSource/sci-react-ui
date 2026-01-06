import "../styles/diamondDS/diamond-colors-primitives.css";
import "../styles/diamondDS/diamond-mui-palette-tokens.css";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme, Theme } from "@mui/material/styles";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageLight from "../public/diamond/logo-light.svg";
import logoShort from "../public/diamond/logo-short.svg";

const DiamondDSThemeOptions = mergeThemeOptions({
  logos: {
    normal: {
      src: logoImageLight,
      srcDark: logoImageLight,
      alt: "Diamond Light Source Logo",
      width: "100",
    },
    short: {
      src: logoShort,
      alt: "Diamond Light Source Logo",
      width: "35",
    },
  },
colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "var(--ds-indigo-9)",
          light: "var(--ds-indigo-8)",
          dark: "var(--ds-indigo-10)",
          contrastText: "var(--ds-gray-1)",
        },
        secondary: {
          main: "var(--ds-violet-9)",
          light: "var(--ds-violet-8)",
          dark: "var(--ds-violet-10)",
          contrastText: "var(--ds-gray-1)",
        },
        text: {
          primary: "var(--ds-gray-12)",
          secondary: "var(--ds-gray-11)",
        },
        background: {
          default: "var(--ds-gray-1)",
          paper: "var(--ds-gray-2)",
        },
        divider: "var(--ds-gray-6)",
      },
    },
    dark: {
      palette: {
        primary: {
          main: "var(--ds-indigo-9)",
          light: "var(--ds-indigo-8)",
          dark: "var(--ds-indigo-10)",
          contrastText: "var(--ds-gray-1)",
        },
        secondary: {
          main: "var(--ds-indigo-9)",
          light: "var(--ds-indigo-8)",
          dark: "var(--ds-indigo-10)",
          contrastText: "var(--ds-gray-1)",
        },
        text: {
          primary: "var(--ds-gray-1)",
          secondary: "var(--ds-gray-4)",
        },
        background: {
          default: "var(--ds-gray-12)",
          paper: "var(--ds-gray-11)",
        },
        divider: "var(--ds-gray-6)",
      },
    },
  },

  components: {

    MuiButton: { /* your overrides */ },
  },
  
});

const DiamondDSTheme: Theme = createTheme(DiamondDSThemeOptions);

export { DiamondDSTheme, DiamondDSThemeOptions };
