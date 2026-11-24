# Installation

Use this page to install SciReactUI, configure the Diamond Design System theme, and start using components in your React application.

Source code: [github.com/diamondlightsource/sci-react-ui](https://github.com/diamondlightsource/sci-react-ui)

## Usage

### First, install the package

In your React app, add the latest SciReactUI version:

```shell
pnpm add @diamondlightsource/sci-react-ui
```

Import the library's font styles once, for example in your app's entry point:

```tsx
// main.tsx
import "@diamondlightsource/sci-react-ui/font-styles.css";
```

`@mui/icons-material` and `react-icons` are peer dependencies, so install them too if you use icon-based components:

```shell
pnpm add @mui/icons-material react-icons
```

For icons in your own application code (not required by SciReactUI itself), we recommend [Lucide](https://lucide.dev/). See the Icons foundation page ([foundation/icons.md](foundation/icons.md)) for guidance:

```shell
pnpm add lucide-react
```

### Next, add a ThemeProvider

Use the provided `DiamondDSTheme` with the `ThemeProvider`, or create your own (see below). The theme controls colour via semantic surface tokens.

```tsx
// main.tsx
import { ThemeProvider } from "@diamondlightsource/sci-react-ui";

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
```

The design system theme consists of two parts:

- Theme configuration (`DiamondDSTheme.ts`)
- Semantic role tokens (`DiamondDSTokens.css`, listed in full in [Theme colours](foundation/theme-colours.md))

### Finally, add the components

Then create something. For instance, you may want a navigation bar at the top of your website:

```tsx
// App.tsx
import { Container, Typography } from "@mui/material";
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

Typically, a complete app page would combine many components, for example:

```tsx
// App.tsx
function App() {
  return <>
    <Navbar
      logo="theme"
      leftSlot={
        <NavLinks>
          <NavLink href="#link">Link</NavLink>
        </NavLinks>
      }
      rightSlot={<>
        <User
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <ColourSchemeButton />
      </>}
    />

    <Container>
      <Typography>Main Content here.</Typography>
    </Container>

    <Footer logo="theme">
      <FooterLinks>
        <FooterLink href="#link">Link</FooterLink>
      </FooterLinks>
      <p>From SciReactUI</p>
    </Footer>
  </>
}
```

### Using Material React Table (optional)

Material React Table (MRT) is not a native MUI component, so it does not pick up `DiamondDSTheme` automatically. Pass `DiamondDSIntegrations`' values into each table:

```tsx
// App.tsx
import { useMaterialReactTable } from "material-react-table";
import { DiamondDSIntegrations } from "@diamondlightsource/sci-react-ui";

const table = useMaterialReactTable({
  columns,
  data,
  mrtTheme: DiamondDSIntegrations.mrtTheme,
  ...DiamondDSIntegrations.mrtOptions(),
});
```

This must be applied per table. See the [Material React Table guidance](components/material-react-table.md) for full details, including options for full-width tables.

## Adapting the Diamond DS theme

The Diamond DS theme is a semantic layer built on top of MUI. It separates component behaviour from fixed Diamond colours, so the same theme structure can be reused with a different palette.

The important part is the role tokens. If your CSS defines the same role variables, the components will continue to work with your new colours.

To create your own theme:

1. Copy the base files from the [repository](https://github.com/DiamondLightSource/sci-react-ui/tree/main/src) (they are not in the installed package) and rename them for your own project:
   - `src/themes/DiamondDSTheme.ts` to `MyDSTheme.ts`
   - `src/styles/diamondDS/DiamondDSTokens.css` to `MyDSTokens.css`

2. Update the CSS tokens.

   The CSS file defines semantic roles such as surfaces, text, and borders. Keep the variable names the same, but update the values:

   ```css
   :root {
     --ds-surface: #ffffff;
     --ds-on-surface: #1a1c23;
   }
   ```

## Avoiding dark mode flicker

Applications that support dark mode may briefly render the default colour scheme before the user's preferred mode is applied.

### SSR applications

To prevent a flash of incorrect theme in SSR applications, use MUI's `InitColorSchemeScript` and place it before your application content so the correct colour scheme is applied before hydration.

For example, for the Next.js App Router:

```tsx
// layout.tsx
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" />
        {props.children}
      </body>
    </html>
  );
}
```

If your app renders into `index.html`, place the script at the top of the body so the mode is set before React mounts.

For more information see MUI's documentation on [InitColorSchemeScript](https://v7.mui.com/material-ui/react-init-color-scheme-script/).

### Client-side applications (Vite and similar)

For client-side applications, initialise the mode before React mounts:

```html
<body>
  <script>
    (function () {
      var mode = localStorage.getItem("mui-mode");
      if (mode) {
        document.documentElement.setAttribute("data-mode", mode);
      }
    })();
  </script>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

This ensures the correct DiamondDS token set is applied before the first paint, avoiding a flash of the default colour scheme when a saved preference exists.

DiamondDS uses:

```html
<html data-mode="light">
```

or

```html
<html data-mode="dark">
```

and should be configured with:

```tsx
colorSchemeSelector: '[data-mode="%s"]'
```
