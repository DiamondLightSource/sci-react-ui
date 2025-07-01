import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme, Theme } from "@mui/material/styles";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageDark from "../public/diamond/logo-dark.svg";
import logoImageLight from "../public/diamond/logo-light.svg";
import logoShort from "../public/diamond/logo-short.svg";

const dlsLogoBlue = "#202740";
const dlsLogoYellow = "#facf07";

const DiamondThemeOptions = mergeThemeOptions({
  logos: {
    normal: {
      src: logoImageDark, // Use the dark image for light backgrounds
      srcDark: logoImageLight, // Use the light image for dark backgrounds
      alt: "Diamond Source Logo",
      width: "100",
    },
    short: {
      src: logoShort,
      alt: "Diamond Source Logo",
      width: "35",
    },
  },
  colorSchemes: {
    // https://zenoo.github.io/mui-theme-creator/
    light: {
      palette: {
        primary: {
          main: dlsLogoBlue,
          light: "#4C5266", // dark grey
          dark: "#161B2C", // dark blue
          contrastText: "#ffffff", // white
        },
        secondary: {
          main: dlsLogoYellow,
          light: "#FBD838", // light yellow
          dark: "#AF9004", // dark yellow
          contrastText: "#000000", // black
        },
        text: {
          secondary: "#161B2C",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#6175bd", //lightened version of {dlsLogoBlue}
          light: "#8090CA", // lighter blue
          dark: "#435184", // mid blue
          contrastText: "#ffffff", // white
        },
        secondary: {
          main: dlsLogoYellow,
          light: "#FBD838", // light yellow
          dark: "#AF9004", // dark yellow
          contrastText: "#000000", // black
        },
        text: {
          secondary: "#8090CA",
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          textTransform: "none",
          "&.MuiButton-contained": {},
          "&.default": {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark,
            "&:hover": {
              backgroundImage: "linear-gradient(rgb(0 0 0/30%) 0 0)",
              "&:disabled": {
                backgroundColor: theme.palette.primary.light,
              },
            },
          },
          "&.onBlue": {
            color: theme.palette.secondary.light,
            borderColor: theme.palette.secondary.light,
            border: "1px solid",
            fontSize: "0.875rem",
            "&:hover": {
              color: theme.palette.primary.dark,
              backgroundColor: theme.palette.secondary.light,
            },
          },
        }),
      },
    },
  },
});

const DiamondTheme: Theme = createTheme(DiamondThemeOptions);

export { DiamondTheme, DiamondThemeOptions };
