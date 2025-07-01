import { createTheme, Theme } from "@mui/material/styles";

import { BaseThemeOptions } from "./BaseTheme";

import logoImageDark from "../public/generic/logo-dark.svg";
import logoImageLight from "../public/generic/logo-light.svg";

const GenericTheme: Theme = createTheme({
  ...BaseThemeOptions,
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

export { GenericTheme };
