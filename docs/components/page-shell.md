# Page shell and identity

The components that make up an app's frame and identity: title bar, plain bar, colour mode switch, logos and the signed-in user. Back to the [components index](../components.md).

## AppTitlebar

A large title bar for your app. Not to be confused with MUI's `AppBar`. It is a [`Bar`](#bar) with a title in the left slot, and it accepts every `Bar` prop. `AppTitle` is also exported, for placing the title in another slot or changing its typography.

**Props** (plus all [`Bar`](#bar) props)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | none | The title, shown in the left slot as an `h4`. |
| `surface` | `Bar` surface | `"surface"` | Background family. |
| `variant` | `"solid" \| "container" \| "base"` | `"container"` | How saturated the surface is. |
| `children` | `ReactNode` | none | Placed in the left slot after the title. |

`AppTitle` takes a required `title` and extends MUI `Typography` props. It renders `h4` text with `id="app-title"` by default.

**Example**

```tsx
import { AppTitlebar } from "@diamondlightsource/sci-react-ui";

<AppTitlebar title="My App" rightSlot={<button>Action</button>} />;
```

**From the stories**

- Simple: display a title by setting `title="Your App Name"`.
- In the centre slot: to place the title elsewhere, pass `AppTitle` to the slot you want.
- With actions: use slots to add actions or controls to the title bar.
- Custom typography: pass your own `AppTitle` as a child to override the typography, for example `<AppTitle title="My Great App" variant="h2" />`.
- Variants: `AppTitlebar` defaults to a surface container but can be adapted for different emphasis and context, for example `surface="primary" variant="container"`, `surface="surface" elevation={2}` or `surface="brand" variant="solid"`.

**See also:** [Layout patterns](../layout-patterns.md).

## Bar

A basic bar with three slots and adjustable width. Children are placed in the left slot. It is the base for `AppTitlebar`, `Navbar` and `Footer`-style bars. Extends MUI `Box` props.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leftSlot` | `ReactNode` | none | Content on the left. `children` follow it in the same slot. |
| `centreSlot` | `ReactNode` | none | Content centred horizontally in the bar. |
| `rightSlot` | `ReactNode` | none | Content on the right. |
| `surface` | see below | `"surface"` | The background family. |
| `variant` | `"solid" \| "container" \| "base"` | `"base"` | How saturated the chosen surface is. |
| `elevation` | `number` | `0` | Elevation of the `base` background, 0 to 24. Higher values look more raised. Ignored by `solid` and `container`. |
| `containerWidth` | `false \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | MUI `Container` default | Width of the content. A breakpoint uses the matching width from the theme. `false` makes the content as wide as the screen. |

The centre slot is positioned at 50% of the bar, so it stays centred whatever is in the left and right slots. If those are wide enough, they can overlap it.

### Choosing a surface and variant

`surface` picks the background family and `variant` picks how saturated it is within that family.

| `surface` | What it is | `variant` |
| --- | --- | --- |
| `primary`, `secondary`, `brand` | Semantic intent colours. | `solid` and `container` use the intent colour. `base` does not: it falls back to the same plain neutral background as `surface`. |
| `brand-fixed`, `brand-fixedDim` | A persistent Diamond identity colour that stays constant across light and dark mode, unlike `brand`. | Ignored. |
| `surface`, `paper` | Neutral, non-branded surface. The two are aliases. | `base` follows `elevation`, `container` is a subtle tint, `solid` is the strongest neutral. |
| `background` | The page's own background colour. | Ignored. |

**Example**

```tsx
import { Typography } from "@mui/material";
import { Bar } from "@diamondlightsource/sci-react-ui";

<Bar
  surface="primary"
  variant="container"
  containerWidth="md"
  leftSlot={<Typography>Left</Typography>}
  centreSlot={<Typography>Centre</Typography>}
  rightSlot={<Typography>Right</Typography>}
/>;
```

**From the stories**

- Variants on a surface: variants control emphasis on neutral surfaces. Base relies on elevation, container is subtle, and solid is strong.
- Elevation scale: elevation controls hierarchy on neutral surfaces with the base variant. Higher values appear more raised.
- Primary versus surface: semantic surfaces such as primary and secondary express intent, while neutral surfaces define structure and hierarchy. This only holds for `solid` and `container`.
- Action variants: `solid` and `container` adjust emphasis on a semantic surface. `base` does not tint primary, secondary or brand.
- Brand options: brand surfaces are used for identity. `brand-fixed` and `brand-fixedDim` ignore `variant` and stay a constant colour across light and dark mode, unlike `brand`, which adapts with the theme.
- With children: children are placed in the left slot, after `leftSlot`.
- Width: set `containerWidth` to a breakpoint (`xs`, `sm`, `md`, `lg`, `xl`) or `false` to match the screen width.

**See also:** [Layout patterns](../layout-patterns.md), [Colour](../foundation/colour.md).

## ColourSchemeButton

A button that switches between light and dark mode. It shows a moon icon in light mode and a sun icon in dark mode, and sets the mode on click. Extends MUI `IconButton` props.

It reads the colour scheme from the theme, so it must sit inside `ThemeProvider`. It renders nothing until the mode is known. Its own styling takes priority over an `sx` prop, and it adds an `aria-label` of "Colour scheme switcher: light" or "Colour scheme switcher: dark" unless you pass your own. A passed `onClick` runs after the mode changes.

**Example**

```tsx
import { ColourSchemeButton } from "@diamondlightsource/sci-react-ui";

<ColourSchemeButton />;
```

**From the stories**

- Interactive: switches between dark and light modes. In Storybook it does not follow the global theme switching.

**See also:** [Installation](../installation.md) for avoiding a flash of the wrong mode on load.

## Logo

Shows the logo defined by the theme. Use it in a `Navbar`, `Footer` or [`Bar`](#bar). It returns nothing if the theme has no logo. To set the logo in your own theme, see [Logos](../theme/logos.md).

Only the props below are used. Other `Box` props are ignored.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `short` | `boolean` | `false` | Use the theme's short logo instead of the normal one. |
| `tone` | `"default" \| "inverse"` | `"default"` | `"default"` follows light and dark mode. `"inverse"` forces the inverse version. |
| `fixedTone` | `"light" \| "dark"` | none | Forces the light or dark image in both modes. Takes priority over `tone`. |
| `style` | `CSSProperties` | none | Styles passed to the underlying `img`. |
| `interchange` | `boolean` | none | Deprecated. Use `tone="inverse"`. |

**Example**

```tsx
import { Logo } from "@diamondlightsource/sci-react-ui";

<Logo />;
<Logo short />;
<Logo tone="inverse" />;
<Logo fixedTone="dark" style={{ padding: 10, background: "grey" }} />;
```

**From the stories**

- The logo: the normally sized logo.
- The short logo: the shorter image, using `short`.
- Light logo for a dark theme: you can swap the light and dark logo with `tone="inverse"`. Useful depending on what background it is displayed on.
- Forced dark logo: `fixedTone="dark"` forces the dark logo regardless of theme.

**See also:** [Logos](../theme/logos.md).

## ImageColourSchemeSwitch

An image that changes with light and dark mode. `Logo` is built on it, and you can use it for any image that needs a light and a dark version.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `image` | `ImageColourSchemeSwitchType` | required | The definition for the two images, see below. |
| `tone` | `"default" \| "inverse"` | `"default"` | When `"inverse"`, the light image appears in dark mode and the reverse. |
| `fixedTone` | `"light" \| "dark"` | none | When `"light"`, the light image appears in both modes, and the reverse for `"dark"`. Takes priority over `tone`. |
| `style` | `CSSProperties` | none | Additional styles for the underlying `img` tag. |
| `interchange` | `boolean` | none | Deprecated. Use `tone="inverse"`. |

`ImageColourSchemeSwitchType`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `src` | `string` | yes | The source for the light version. |
| `srcDark` | `string` | no | The source for the dark version. |
| `alt` | `string` | yes | Alternative text shown instead of the image. |
| `width` | `string` | no | A specific width. |
| `height` | `string` | no | A specific height. |

**Example**

```tsx
import { ImageColourSchemeSwitch } from "@diamondlightsource/sci-react-ui";

<ImageColourSchemeSwitch
  image={{
    src: "/logo-light-surface.svg",
    srcDark: "/logo-dark-surface.svg",
    alt: "My logo",
    width: "100",
  }}
/>;
```

**From the stories**

- Switching image: the image changes depending on the colour scheme mode selected.
- Size: set `width` or `height` in `image` for a specific size.
- Additional styles: pass `style` to style the underlying `img` tag.
- Inverse tone: `tone="inverse"` flips which image appears in light and dark mode.
- Forced tone: `fixedTone="dark"` shows the dark image in both modes, and `fixedTone="light"` shows the light image in both.
- Non-switching image: an image with only a `src` does not switch when the colour scheme mode changes.

**See also:** [Logos](../theme/logos.md).

## User

A control to log in and out with, and to show user information. When there is no user it shows a Login button. When there is a user it shows an avatar, the name and the FedID, and opens a menu when clicked. Extends no MUI props.

The menu appears only if you pass `onLogout`, `menuItems` or `auth`. Without one of those, the user is shown with no menu.

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `user` | `{ name?: string; fedid?: string } \| null` | none | The signed-in user. When empty, the Login button is shown. If `name` is missing, the `fedid` is shown on its own. |
| `onLogin` | `() => void` | none | Called when Login is clicked. |
| `onLogout` | `() => void` | none | Called when Logout is clicked. Adds the Logout menu item. |
| `avatar` | `ReactNode` | a default avatar | Replaces the avatar. Perhaps use a photo. |
| `menuItems` | `MenuItem` or `MenuItem[]` | none | Extra items shown above Logout. |
| `auth` | `Auth` | none | The value from `useAuth()`. Fills in the user's name, calls `auth.login()` and `auth.logout()`, and adds a Profile link. |

**Example**

With SciReactUI's auth:

```tsx
import { User, useAuth } from "@diamondlightsource/sci-react-ui";

const auth = useAuth();

<User auth={auth} />;
```

Without it:

```tsx
import { MenuItem } from "@mui/material";
import { User } from "@diamondlightsource/sci-react-ui";

<User
  user={{ name: "Name Surname", fedid: "abc12345" }}
  onLogout={() => {}}
  menuItems={[<MenuItem key="settings">Settings</MenuItem>]}
/>;
```

**From the stories**

- Logged out: the default display when not yet logged in.
- Logged in: the default display when logged in.
- No FedID: logged in, but with no FedID.
- Long name: logged in with a long name.
- Replaced avatar: you can change the avatar image.
- Additional menu items: you can add menu items with `menuItems`.
- Using auth: if you are using SciReactUI's auth mechanism, pass the result of `useAuth()` as `auth`.

**See also:** [Authentication](../helpers/auth.md).
