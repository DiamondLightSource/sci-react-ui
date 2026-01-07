import "../styles/diamondDS/diamond-colors-primitives.css";
// import "../styles/diamondDS/diamond-mui-palette-tokens.css"; /* Not used */

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme, Theme } from "@mui/material/styles";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageLight from "../public/diamond/logo-light.svg";
import logoImageDark from "../public/diamond/logo-dark.svg";
import logoShort from "../public/diamond/logo-short.svg";

export type DSMode = "light" | "dark";

export const createMuiTheme = (mode: DSMode): Theme => {
  const DiamondDSThemeOptions = mergeThemeOptions({
    typography: {
      fontFamily: [
        "Inter Variable",
        "Inter",
        "system-ui",
        "-apple-system",
        '"Segoe UI"',
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
    },

    logos: {
      normal: {
        src: mode === "dark" ? (logoImageDark ?? logoImageLight) : logoImageLight,
        srcDark: logoImageDark ?? logoImageLight,
        alt: "Diamond Light Source Logo",
        width: "100",
      },
      short: {
        src: logoShort,
        alt: "Diamond Light Source Logo",
        width: "35",
      },
    },

    palette: {
      mode,

      primary: {
        main: "var(--ds-indigo-10)",
        light: "var(--ds-indigo-09)",
        dark: "var(--ds-indigo-11)",
        contrastText: "var(--ds-on-accent)",
      },

      secondary: {
        main: "var(--ds-navy-10)",
        light: "var(--ds-navy-09)",
        dark: "var(--ds-navy-11)",
        contrastText: "var(--ds-on-accent)",
      },

      text: {
        primary: "var(--ds-gray-12)",
        secondary: "var(--ds-gray-11)",
        disabled: "var(--ds-gray-8)",
      },

      background: {
        default: "var(--ds-gray-1)",
        paper: "var(--ds-gray-2)",
        outlinedBg: "var(--ds-gray-2)",
      },

      divider: "var(--ds-gray-6)",

      // 👇 Prevent "Material dark overlays" by defining action tokens from your primitives
      action: {
        hover: "var(--ds-overlay-hover)",
        selected: "var(--ds-overlay-selected)",
        focus: "var(--ds-overlay-focus)",
        disabled: "var(--ds-overlay-disabled)",
        disabledBackground: "var(--ds-overlay-disabled-bg)",

        hoverOpacity: 0.08,
        selectedOpacity: 0.12,
        disabledOpacity: 0.38,
        focusOpacity: 0.12,
      },

      error: {
        main: "var(--ds-red-10)",
        light: "var(--ds-red-09)",
        dark: "var(--ds-red-11)",
        contrastText: "var(--ds-on-inverse)",
      },

      warning: {
        main: "var(--ds-orange-10)",
        light: "var(--ds-orange-09)",
        dark: "var(--ds-orange-11)",
        contrastText: "var(--ds-on-inverse)",
      },

      info: {
        main: "var(--ds-indigo-10)",
        light: "var(--ds-indigo-09)",
        dark: "var(--ds-indigo-11)",
        contrastText: "var(--ds-on-accent)",
      },

      success: {
        main: "var(--ds-green-10)",
        light: "var(--ds-green-09)",
        dark: "var(--ds-green-11)",
        contrastText: "var(--ds-on-inverse)",
      },

      grey: {
        50: "var(--ds-olive-1)",
        100: "var(--ds-olive-2)",
        200: "var(--ds-olive-3)",
        300: "var(--ds-olive-4)",
        400: "var(--ds-olive-5)",
        500: "var(--ds-olive-6)",
        600: "var(--ds-olive-7)",
        700: "var(--ds-olive-8)",
        800: "var(--ds-olive-9)",
        900: "var(--ds-olive-10)",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  return createTheme(DiamondDSThemeOptions);
};

export const DiamondDSTheme = createMuiTheme("light");
export const DiamondDSThemeDark = createMuiTheme("dark");
