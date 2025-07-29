import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme, Theme } from "@mui/material/styles";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageDark from "../public/generic/logo-dark.svg";
import logoImageLight from "../public/generic/logo-light.svg";

const GenericThemeOptions = mergeThemeOptions({
  logos: {
    normal: {
      src: logoImageLight,
      srcDark: logoImageDark,
      alt: "Generic Logo",
      width: "100",
    },
    short: {
      src: logoImageDark,
      alt: "Generic Logo",
      width: "60",
    },
  },
});

const GenericTheme: Theme = createTheme(GenericThemeOptions);

export { GenericTheme, GenericThemeOptions };
