# Theme logos

A theme can carry its own logos. The `Logo` component reads them from the theme, and the Navbar and Footer use it. To see the built-in logos, open the Theme/Logos page in [Storybook](https://diamondlightsource.github.io/sci-react-ui/).

Add logos to a new theme through the `logos` option of the `createTheme` call:

```js
{
  // ...
  logos: {
    normal: {
      src: logo,
      alt: "My Logo",
      width: "100",
      height: "50",
    },
  },
  // ...
}
```

## Sizes

There are two image sizes: a regular `normal` and a smaller `short`. They are currently used in the Navbar and the Footer respectively, through the `Logo` component.

## Switch with colour scheme

To switch the logo with the current colour scheme, add a `srcDark` option.

```js
import logo from "my-images/logo.svg";
import logoDark from "my-images/logo-dark.svg";

logos: {
  normal: {
    src: logo,
    srcDark: logoDark,
    alt: "My Logo",
  },
},
```

## Theme

To create a new theme with your logos:

```js
import { createTheme } from "@mui/material/styles";
import { BaseThemeOptions } from "@diamondlightsource/sci-react-ui";
import logo from "my-images/logo.svg";

const MyTheme = createTheme({
  ...BaseThemeOptions,
  logos: {
    normal: {
      src: logo,
      alt: "My Logo",
    },
  },
});
```
