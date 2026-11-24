# Navigation

Top bar, menus, footer, side navigation and breadcrumbs. Back to the [components index](../components.md).

## Navbar

A basic navigation bar. Use it with `NavLinks` and `NavLink` to show a responsive list of links, with `NavMenu` for dropdowns.

`Navbar` extends `Bar`, so it takes the `Bar` props below plus the two shown after them. Below the `md` breakpoint, `NavLinks` collapses into a menu button that opens a drawer.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `surface` | `"brand" \| "brand-fixed" \| "brand-fixedDim" \| "primary" \| "secondary" \| "surface" \| "paper" \| "background"` | `"brand"` | Background family. `brand-fixed` and `brand-fixedDim` stay one colour in light and dark mode. `surface` and `paper` are neutral. |
| `variant` | `"solid" \| "container" \| "base"` | `"solid"` | How saturated the surface is. `base` is a plain neutral background, even on a semantic surface. Ignored by `brand-fixed`, `brand-fixedDim` and `background`. |
| `elevation` | `number` | none | Raises the neutral base background. |
| `containerWidth` | `false \| Breakpoint` | MUI `Container` default | Maximum width of the content. `false` makes the bar full width, with a 12px side gutter. |
| `logo` | `"theme"` or `{ src, srcDark?, alt, width?, height? }` | none | Shows a logo that links to `/`. `"theme"` uses the logo from the theme. |
| `linkComponent` | `React.ElementType` | none | Router link component for the logo link, for example `NavLink` from React Router. Each `NavLink` takes its own `linkComponent`. |
| `leftSlot`, `centreSlot`, `rightSlot` | `ReactNode` | none | Content for the three areas of the bar. `children` also go in the left area, after the logo and `leftSlot`. |

`NavLink` takes `href` for a plain link, or `to` with `linkComponent` for a router link. It extends MUI `Link`. `NavLinks` takes `NavLink` elements as children.

Most Diamond apps should use `brand-fixed` or `surface` with `base`, not the default. A constant identity colour or a neutral header gives a stable anchor across light and dark mode. A saturated surface (`brand-fixed`, `brand-fixedDim`, or `solid` on `brand`, `primary` or `secondary`) stands apart from the page. Every other combination gets a bottom border instead.

**Example**

```tsx
import {
  ColourSchemeButton,
  NavLink,
  NavLinks,
  Navbar,
  User,
} from "@diamondlightsource/sci-react-ui";

export const Header = () => (
  <Navbar
    logo="theme"
    surface="surface"
    variant="base"
    rightSlot={
      <>
        <User
          onLogin={() => {}}
          onLogout={() => {}}
          user={{ name: "Ada Lovelace", fedid: "abc12345" }}
        />
        <ColourSchemeButton />
      </>
    }
  >
    <NavLinks>
      <NavLink href="/acquisition">Acquisition</NavLink>
      <NavLink href="/analysis">Analysis</NavLink>
    </NavLinks>
  </Navbar>
);
```

**From the stories**

- **Variants:** `Navbar` defaults to `brand` (solid), which adapts with light and dark mode. The alternatives are `brand-fixed` (a persistent Diamond identity colour that doesn't change with mode), `surface` with `base`, and `surface` with `container`. The two surface variants get a bottom border, because they are too close in tone to the page background to rely on contrast alone.
- **Links and router links:** use `href` for plain links, or `to` with `linkComponent` for routing links.
- **Menus:** the `NavMenu` component is used to contain multiple links.
- **Theme logo:** the logo is pulled in from the theme when `logo` is set to `"theme"`.
- **Other logo:** a separate image can also be referenced, with `logo={{ src, srcDark, alt }}`.
- **Logo as a child:** you can pass the logo in as a child instead of using the `logo` prop, for advanced control.

**See also:** [Layout patterns](../layout-patterns.md), [Authentication](../helpers/auth.md), [Logos](../theme/logos.md).

## NavMenu

A dropdown menu for the `Navbar`. It holds several `NavMenuLink`s, which can be moved between with the mouse or the keyboard. Most new apps don't need it.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | required | The text on the button that opens the menu. |
| `children` | `ReactNode` | none | `NavMenuLink`s, or other content. |

`NavMenu` extends MUI `MenuList` props. `NavMenuLink` takes the same link props as `NavLink` (`href`, or `to` with `linkComponent`) and extends MUI `MenuItem`. Clicking a `NavMenuLink` closes the menu.

**Example**

```tsx
import { NavMenu, NavMenuLink, Navbar } from "@diamondlightsource/sci-react-ui";

export const Header = () => (
  <Navbar logo="theme">
    <NavMenu label="Planets">
      <NavMenuLink href="#earth">Earth</NavMenuLink>
      <NavMenuLink href="#mars">Mars</NavMenuLink>
    </NavMenu>
  </Navbar>
);
```

**From the stories**

- **Basic menu:** a `NavMenu` populated with `NavMenuLink`s. The menu text is set with `label`.
- **Router menu:** like `NavLink`s, `NavMenuLink`s can use routing links too.
- **Custom children:** a `NavMenu` may contain components other than `NavMenuLink`s, such as a section header made from a `Typography` and a `Divider`, and a button.

## Footer

A footer bar for links, a copyright line, a logo, or whatever you like. Use it with `FooterLinks` and `FooterLink` to show a list of links. Most apps don't need a footer.

`Footer` extends `Bar`. See the [Navbar](#navbar) props for `variant`, `elevation`, `containerWidth` and the three slots. Its defaults differ: it uses the `surface` background with the `container` variant. It renders with the `contentinfo` role.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `logo` | `"theme"` or `{ src, srcDark?, alt, width?, height? }` | none | Shows a logo at the right. `"theme"` uses the short logo from the theme. |
| `copyright` | `string \| null` | none | Shows `Copyright © <year> <copyright>` under the logo. |
| `leftSlot`, `centreSlot`, `rightSlot` | `ReactNode` | none | Content for the three areas. `children` go in the left area, after `leftSlot`. |

`FooterLinks` lays links out in a wrapping row and extends MUI `Stack`. `FooterLink` takes `href`, or `to` with `linkComponent` for a router link.

To keep the footer at the bottom of short pages, set `min-height: 100vh; display: flex; flex-direction: column;` on its parent.

**Example**

```tsx
import { Footer, FooterLink, FooterLinks } from "@diamondlightsource/sci-react-ui";

export const PageFooter = () => (
  <Footer logo="theme" copyright="Diamond Light Source">
    <FooterLinks>
      <FooterLink href="/privacy">Privacy</FooterLink>
      <FooterLink href="/contact">Contact</FooterLink>
    </FooterLinks>
  </Footer>
);
```

**From the stories**

- **Variants:** the footer is subtle by default but supports the full surface and variant system when needed.
- **Combinations:** every part is optional. The stories show links only, logo only, copyright only, and the combinations of links, logo and copyright, with links in the left, centre or right slot.
- **Router links:** use `to` with `linkComponent` for routing links.

## SidebarNav

A collapsing and expanding sidebar for your app's primary navigation.

On screens at or above the `sm` breakpoint it is a permanent MUI drawer that toggles between a wide state (257px, icon and text) and a slim state (65px, icon only, with the label in a tooltip). On smaller screens it is a temporary drawer that overlays the content and closes after you pick an item or click away. The drawer starts below a spacer the height of a `Toolbar`, so it sits under a fixed `AppBar`.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `navigation` | `NavItemGroup[]` | required | The items, in groups. Groups are separated by dividers. |
| `open` | `boolean` | required | Whether the sidebar is in its wide state (or visible, on small screens). |
| `setOpen` | `(open: boolean) => void` | required | Called when the small-screen drawer asks to close. Use it to hold the `open` state. |
| `afterNavSlot` | `ReactNode` | none | Rendered after the navigation items, inside the scrollable area. |
| `footerSlot` | `ReactNode` | none | Pinned to the bottom of the drawer, outside the scrollable area. |

Each `NavItemGroup` has `navItems: NavItemDefinition[]`. Its optional `name` is not displayed. Each item has:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | The item text. Also the accessible name and the tooltip in the slim state. |
| `icon` | `ReactNode` | The icon. |
| `linkProps` | `{ href }` or `{ component, to }` | `href` for a plain anchor. `component` and `to` for a router link, for example `component: NavLink` from React Router. |
| `selected` | `boolean` | Marks the item as selected. Optional. |

**Example**

```tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Abc, GraphicEq } from "@mui/icons-material";
import { SidebarNav } from "@diamondlightsource/sci-react-ui";

const navigation = [
  {
    navItems: [
      {
        label: "Setup",
        icon: <Abc />,
        linkProps: { to: "/setup", component: NavLink },
      },
      {
        label: "Analysis",
        icon: <GraphicEq />,
        linkProps: { to: "/analysis", component: NavLink },
      },
    ],
  },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return <SidebarNav navigation={navigation} open={open} setOpen={setOpen} />;
};
```

**From the stories**

- **Normal links:** with standard links, the caller must handle the selected state and set it on the correct item.
- **Router links:** React Router `NavLink`s handle the selected state internally.
- **Grouped navigation:** sections are grouped with dividers.
- **Slots:** `afterNavSlot` renders inside the scrollable area, right after the navigation items. `footerSlot` is pinned to the bottom of the drawer, outside the scroll area.
- **With an app bar:** MUI draws a drawer above everything, so raise the `AppBar`'s `zIndex` above the drawer's. See the starting app example in [Layout patterns](../layout-patterns.md).

## Breadcrumbs

Not to be confused with MUI's `Breadcrumbs` component. This is a bar that shows where the user is, with a home link first and the current page as plain text last.

It extends `Bar` (default `surface` is `"surface"`, default `variant` is `"container"`). See the [Navbar](#navbar) props for `variant`, `elevation` and `containerWidth`.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `path` | `string \| string[] \| { name: string; href: string }[]` | required | The trail. A string is split on `/`, and each part is capitalised and linked to the path up to it. An array of strings works the same way. Use objects to set the name and link of each crumb yourself. Names always get an initial capital. Empty parts are ignored. |
| `linkComponent` | `React.ElementType` | none | Router link component, for example `NavLink` from React Router. Without it, crumbs are plain anchors. |
| `muiBreadcrumbsProps` | MUI `Breadcrumbs` props | none | Passed to the inner MUI `Breadcrumbs`. |

The package also exports `getCrumbs(path)`, which returns the `{ name, href }` list that `Breadcrumbs` builds from `path`.

**Example**

```tsx
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";

export const Trail = () => (
  <>
    <Breadcrumbs path="/proposals/cm12345/visits" />
    <Breadcrumbs
      path={[
        { name: "Proposals", href: "/proposals" },
        { name: "cm12345-1", href: "/proposals/cm12345/visits/1" },
      ]}
      linkComponent={NavLink}
    />
  </>
);
```

**From the stories**

- **Surfaces:** breadcrumbs are subtle by default but can adapt to different surfaces when needed.
- **Paths:** the stories cover a short path (one part), a long path, parts whose link differs from their name, an empty path, and use without a `linkComponent`.
