import { createTheme, Theme } from "@mui/material/styles";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageDark from "../public/generic/logo-dark-surface.svg";
import logoImageLight from "../public/generic/logo-light-surface.svg";

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
