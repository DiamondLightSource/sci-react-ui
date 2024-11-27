Scientific React UI
===================

Scientific React UI components, based on MUI.

Initial code. No components yet.

See tools.md for list of tools used in this library

Using
-----

### Installing

Install as usual:

```sh
npm i @diamondlightsource/sci-react-ui
```

### Usage

First use the ThemeProvider and supply a theme.

```js
import {
    ThemeProvider,
	DiamondTheme
} from "@diamondlightsource/sci-react-ui";

root.render(
  <ThemeProvider theme={DiamondTheme}>
    <App />
  </ThemeProvider>
)
```

There are currently two themes, `BaseTheme` or `DiamondTheme`, but you can adapt your own.

There are various components, here's an example of how to use the NavBar:

```js
import {Box, Typography} from "@mui/material";
import {
  Navbar,
  NavLink,
  NavLinks
} from "@diamondlightsource/sci-react-ui";

function App() {
  return <>
    <Navbar>
      <NavLinks key="links">
        <NavLink href="#" key="first">A link</NavLink>
      </NavLinks>
    </Navbar>
    <Box sx={{display:"flex",  justifyContent: "center"}}>
      <Box sx={{padding:4}}>
        <Typography variant="h2">Scientific UI Collection</Typography>
        <Typography>A collection of science based React components.</Typography>
      </Box>
    </Box>
  </>
}
export default App;
```

### Documentation

Documentation is created with Storybook, read it at [Documentation](https://github.com/DiamondLightSource/sci-react-ui)

Developing
----------

Code can be found at [DiamondLightSource/sci-react-ui](https://github.com/DiamondLightSource/sci-react-ui).

You'll need `pnpm` installed.

### Build

First install all packages

```sh
pnpm install
```

Build with rollup

```sh
pnpm run rollup
```

### Unit Test

Test with Jest

```sh
pnpm run test
```

### App test

Create an app.

To test it outside of publish, you may be able include the package directly from source:
```sh
pnpm link <path-to-this-app-folder>
```
If that doesn't work, you can pack, then install:

In this folder:
```sh
pnpm pack
```
In the other app:
```sh
pnpm install <path-to-this-app-folder>/diamondlightsource-sci-react-ui-0.0.1.tgz
```