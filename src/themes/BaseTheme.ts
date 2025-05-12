// import {ThemeOptions} from "@mui/material/styles";
import { ImageColorSchemeSwitchType } from "../components/controls/ImageColorSchemeSwitch";

// Make additions to theme, so that anything can be available throughout the app
declare module "@mui/material/styles" {
  interface Theme {
    logos?: {
      normal: ImageColorSchemeSwitchType;
      short?: ImageColorSchemeSwitchType;
    };
  }
  interface ThemeOptions {
    logos?: {
      normal: ImageColorSchemeSwitchType;
      short?: ImageColorSchemeSwitchType;
    };
  }
}

const BaseThemeOptions /* : ThemeOptions */ = {
  cssVariables: {
    colorSchemeSelector: "class",
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
        primary: "#050505"
      },
    },
    dark: {
      palette: {
        background: { default: "#050505" },
      },
      text: {
        primary: "#fafafa"
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

function isObject(item: any): boolean {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

// Merge based on https://www.geeksforgeeks.org/how-to-deep-merge-two-objects-in-typescript/
function mergeThemeWithBase(mainTheme: any, baseTheme: any=BaseThemeOptions, visited = new Map<any, any>()) {
  if (isObject(mainTheme) && isObject(baseTheme)) {
    for (const key in baseTheme) {
      if (isObject(baseTheme[key])) {
        if (!mainTheme[key]) {
          mainTheme[key] = {};
        }
        // Check if the baseTheme object has already been visited
        if (!visited.has(baseTheme[key])) {
          visited.set(baseTheme[key], {});
          mergeThemeWithBase(mainTheme[key], baseTheme[key], visited);
        } else {
          mainTheme[key] = visited.get(baseTheme[key]);
        }
      } else {
        mainTheme[key] = baseTheme[key];
      }
    }
  }
  return mainTheme;
}

export { BaseThemeOptions, mergeThemeWithBase };
