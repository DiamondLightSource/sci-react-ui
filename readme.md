Scientific React UI
===================

Scientific React UI components, based on MUI.
_Early development release._

A theme and component library to make websites at scientific installations simple to create.

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
import { ThemeProvider, DiamondTheme } from "@diamondlightsource/sci-react-ui";

root.render(
  <ThemeProvider theme={DiamondTheme}>
    <App />
  </ThemeProvider>,
);
```

There are currently two themes, `GenericTheme` or `DiamondTheme`, but you can also create/adapt your own.

Navigation components support either static links (with href) or the use of a routing library (with linkComponent and to).
For NavLink and FooterLink, if both linkComponent and to are provided, it will use linkComponent. If not, it falls back to using href.

An example with static links

```js
<Navbar>
  <NavLinks>
    <NavLink href="/about">About</NavLink>
  </NavLinks>
</Navbar>
```

An example using react-router:

```js
import { NavLink } from "react-router-dom";

<Navbar linkComponent={NavLink}>
  <NavLinks>
    <NavLink linkComponent={NavLink} to="/about">
      About
    </NavLink>
  </NavLinks>
</Navbar>
```

For Breadcrumbs, to use static links, omit the linkComponent prop and Breadcrumbs will use a Link component with standard href attributes.

```js
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";

function App() {
  return <Breadcrumbs path={window.location.pathname} />;
}
export default App;
```

To use the Breadcrumbs component with your routing library, use a route provider from your preferred library. For example, to use react-router's BrowserRouter, install react-router-dom:

```sh
npm i react-router-dom
```

Next, use the BrowserRouter which can be used at the top level:

```js
import { BrowserRouter } from "react-router-dom";
import {
	ThemeProvider,
	DiamondTheme
} from "@diamondlightsource/sci-react-ui";

root.render(
	<ThemeProvider theme={DiamondTheme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>
)
```

Then pass your library's corresponding Link component to Breadcrumbs in the linkComponent prop, for example:

```js
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";

function App() {
  return <Breadcrumbs path={window.location.pathname} linkComponent={NavLink} />;
}
export default App;
```
The Navbar component supports multiple slot props for flexible layout customization: leftSlot, centreSlot, rightSlot.
If a logo is defined (either via the logo prop or from the theme), the layout will arrange elements in the following order from left to right: logo, leftSlot, rightSlot.
The centreSlot is absolutely positioned at 50% horizontally, which means it stays centered regardless of the content on the left or right. However, if the content in the left or right slots is too wide, it may overlap with the centre slot.

Any children passed to the Navbar (NavLinks in the following example) will be placed in a horizontal Stack after the leftSlot.

To control the width of the Navbar contents, containerWidth can be passed which sets the maxWidth property of a Container. This can be set to false to not constrain the contents or to a Breakpoint e.g. 'sm' where 'lg' is the default.

```js
import { Container, Typography } from "@mui/material";
import { Navbar, NavLink, NavLinks } from "@diamondlightsource/sci-react-ui";

function App() {
  return (
    <>
      <Navbar
        leftSlot={<Typography>left</Typography>}
        centreSlot={<Typography>centre</Typography>}
        rightSlot={<Typography>right</Typography>}
        containerWidth={false}
      >
        <NavLinks key="links">
          <NavLink href="#" key="first">
            A link
          </NavLink>
        </NavLinks>
      </Navbar>
    </>
  );
}
export default App;
```

The Footer component supports multiple slot props, the same as Navbar (leftSlot, centreSlot, rightSlot).

If a logo is defined (either via the logo prop or from the theme), the layout will arrange elements in the following order from left to right: leftSlot, rightSlot, logo.
The centreSlot is absolutely positioned at 50% horizontally, which means it stays centered regardless of the content on the left or right. However, if the content in the left or right slots is too wide, it may overlap with the centre slot.

Any children passed to the Footer will be placed in a horizontal Stack after the leftSlot.

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

Publishing
----------

Steps needed when publishing a new version.
- Create a new branch
  - Update the version in [./package.json](package.json) (greater than the published one!)
  - Update the changelog in [./changelog.md](changelog.md) with added/changed/fixed, new version number and today's date.
  - Check this readme still makes sense with the new changes you are about to publish.
  - Check the introduction file [./src/storybook/Introduction.mdx](src/storybook/Introduction.mdx) in Storybook still makes sense.
- Push the branch, get it reviewed and merge.
- Now create a new tag in the format "v" followed by the version (e.g. "v1.2.3")
  - Push it.
- A new npm version should now have been published.

### GitHub release
- GitHub releases and create a new draft release https://github.com/DiamondLightSource/sci-react-ui/releases
  - Select the new tag in the "Choose a tag" drop down.
  - Copy in the npm url "See https://www.npmjs.com/package/@diamondlightsource/sci-react-ui" 
  - Copy in the top section of the changelog.
  - Press "Publish Release"
- It is now published!


### Post Publish Changes
It's useful to increase the version in [./package.json](package.json) with add "alpha", e.g `"version": "0.2.1alpha",`.
and create a new section in  [./changelog.md](changelog.md) so subsequent changes can be append when needed/ e.g.:
```text
[v#.#.#] - 2025-##-##
---------------------

### Added
- 

### Fixed
- 

### Changed
-
```
