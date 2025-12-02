import { createTheme, Theme } from "@mui/material/styles";

import { mergeThemeOptions } from "./ThemeManager";
import {DiamondThemeOptions} from "./DiamondTheme";

import logoImageDark from "../public/diamond/logo-dark.svg";
import logoImageLight from "../public/diamond/logo-light.svg";


const DiamondOldThemeOptions = mergeThemeOptions({
  logos: {
    normal: {
      src: logoImageDark, // Use the dark image for light backgrounds
      srcDark: logoImageLight, // Use the light image for dark backgrounds
      alt: "Diamond Light Source Logo",
      width: "100",
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#6175bd", //lightened version of {dlsLogoBlue}
          light: "#8090CA", // lighter blue
          dark: "#435184", // mid blue
          contrastText: "#ffffff", // white
        },
      },
    },
  },
}, DiamondThemeOptions);

const DiamondOldTheme: Theme = createTheme(DiamondOldThemeOptions);

export { DiamondOldTheme, DiamondOldThemeOptions };
