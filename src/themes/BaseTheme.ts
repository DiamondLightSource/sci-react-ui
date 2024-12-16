// import {ThemeOptions} from "@mui/material/styles";
import {ImageThemeModeType} from "../components/ImageThemeMode";

// Make additions to theme, so that anything can be available throughout the app
declare module '@mui/material/styles' {
  interface Theme {
    logos?: {
      normal: ImageThemeModeType;
      short?: ImageThemeModeType;
    };
  }
  interface ThemeOptions {
    logos?: {
      normal: ImageThemeModeType;
      short?: ImageThemeModeType;
    };
  }
}

const BaseThemeOptions /* : ThemeOptions */ = {
  typography: {
    fontSize: 14,
  },
  colorSchemes: {
    light: {
      palette: {
        background: { default: "#fafafa" },
      },
    },
    dark: {
      palette: {
        background: { default: "#050505" },
      },
    },
  },
  components: {
  
  },
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

export { BaseThemeOptions }