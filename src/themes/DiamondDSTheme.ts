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
          main: "var(--ds-indigo-10)",
          light: "var(--ds-indigo-09)",
          dark: "var(--ds-indigo-11)",
          contrastText: "var(--ds-white)",
        },
        secondary: {
          main: "var(--ds-navy-10)",
          light: "var(--ds-navy-09)",
          dark: "var(--ds-navy-11)",
          contrastText: "var(--ds-white)",
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
          main: "var(--ds-indigo-10)",
          light: "var(--ds-indigo-09)",
          dark: "var(--ds-indigo-11)",
          contrastText: "var(--ds-white)",
        },
        secondary: {
          main: "var(--ds-navy-10",
          light: "var(--ds-navy-09)",
          dark: "var(--ds-navy-11)",
          contrastText: "var(--ds-white)",
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
  },

  components: {

    MuiButton: { /* your overrides */ },
  },
  
});

const DiamondDSTheme: Theme = createTheme(DiamondDSThemeOptions);

export { DiamondDSTheme, DiamondDSThemeOptions };
