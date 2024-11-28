Scientific React UI
===================

Scientific React UI components, based on MUI.

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
import {Container, Typography} from "@mui/material";
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
    <Container>
        <Typography variant="h2">Scientific UI Collection</Typography>
        <Typography>A collection of science based React components.</Typography>
    </Container>
  </>
}
export default App;
```

### Documentation

Documentation is created with Storybook.
Read and play with it at [diamondlightsource.github.io/sci-react-ui](https://diamondlightsource.github.io/sci-react-ui/)

Developing
----------

Code can be found at [github.com/DiamondLightSource/sci-react-ui](https://github.com/DiamondLightSource/sci-react-ui).

You'll need `pnpm` installed to build it. See [tools.md](./tools.md) for list of other tools used in this library

### Build

First install all packages

```sh
pnpm install
```

Build with rollup

```sh
pnpm run rollup
```

### Storybook 

To view the components in Storybook use:

```sh
pnpm run storybook
```


### Unit Test

Test with Jest

```sh
pnpm run test
```

### App test

Create a test app.

To test the package, you may be able to `link` the package directly from source:
```sh
pnpm link <path-to-this-app-folder>
```
But if that doesn't work, you can try `pack`, then `install`:

In the package repo:
```sh
pnpm pack
```
In the test app repo:
```sh
pnpm install <path-to-this-app-folder>/diamondlightsource-sci-react-ui-0.0.1.tgz
```