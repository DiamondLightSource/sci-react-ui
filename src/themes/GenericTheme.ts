import { createTheme, Theme } from "@mui/material/styles";

import {BaseThemeOptions, mergeThemeWithBase} from "./BaseTheme";

import logoImageDark from "../public/generic/logo-dark.svg";
import logoImageLight from "../public/generic/logo-light.svg";

const genericTheme = mergeThemeWithBase({
  ...BaseThemeOptions,
  logos: {
    normal: {
      src: logoImageLight,
      srcDark: logoImageDark,
      alt: "Diamond Source Logo",
      width: "100",
    },
    short: {
      src: logoImageDark,
      alt: "Diamond Source Logo",
      width: "60",
    },
  },
});

const GenericTheme: Theme = createTheme(genericTheme)
export { GenericTheme };
