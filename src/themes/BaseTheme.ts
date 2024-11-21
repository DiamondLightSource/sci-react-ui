import { createTheme } from "@mui/material/styles";

const BaseThemeOptions = {
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
};

const BaseTheme = createTheme(BaseThemeOptions);

export { BaseThemeOptions, BaseTheme };
