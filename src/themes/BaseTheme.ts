// import {ThemeOptions} from "@mui/material/styles";
import { ImageColourSchemeSwitchType } from "../components/controls/ImageColourSchemeSwitch";

// Make additions to theme, so that anything can be available throughout the app
declare module "@mui/material/styles" {
  interface Theme {
    logos?: {
      normal: ImageColourSchemeSwitchType;
      short?: ImageColourSchemeSwitchType;
    };
  }
  interface ThemeOptions {
    logos?: {
      normal: ImageColourSchemeSwitchType;
      short?: ImageColourSchemeSwitchType;
    };
  }
}

const BaseThemeOptions /* : ThemeOptions */ = {
  cssVariables: {
    colorSchemeSelector: "data-mode",
  },
  typography: {
    fontSize: 14,
  },
  colorSchemes: {
    light: {
      palette: {
        background: { default: "#fafafa" },
      },
      text: {
        primary: "#050505",
      },
    },
    dark: {
      palette: {
        background: { default: "#050505" },
      },
      text: {
        primary: "#fafafa",
      },
    },
  },
  components: {},
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 992,
      xl: 1280,
    },
  },
};

export { BaseThemeOptions };
