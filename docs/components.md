# Components

The components SciReactUI adds on top of MUI. Everything else in your app should be a standard MUI component, styled by the theme. See [MUI components](components/mui.md) for what the theme changes, and [Working with components](working-with-components.md) for when to extend or create one.

Each component has a short description, the props that matter and an example. The notes under "From the stories" are the descriptions of the examples in Storybook. The components are split across three pages:

- [Page shell and identity](components/page-shell.md): AppTitlebar, Bar, ColourSchemeButton, Logo, ImageColourSchemeSwitch, User.
- [Navigation](components/navigation.md): Navbar, NavMenu, Footer, SidebarNav, Breadcrumbs.
- [Inputs, progress and data](components/inputs-and-data.md): NumberInput, VisitInput, Progress, ProgressDelayed, ScrollableImages, DataCard, DataGroup.

All components are imported from the package root:

```tsx
import { Navbar, SidebarNav, NumberInput } from "@diamondlightsource/sci-react-ui";
```

They need `ThemeProvider` around your app. See [Installation](installation.md).

## Which component do I need?

| You need                                         | Use                                                                         |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| A top bar with links, logo and user              | [Navbar](components/navigation.md#navbar)                                                           |
| A page footer, if your app needs one             | [Footer](components/navigation.md#footer)                                                           |
| Collapsing primary navigation down the side     | [SidebarNav](components/navigation.md#sidebarnav)                                                   |
| A trail showing where the user is                | [Breadcrumbs](components/navigation.md#breadcrumbs)                                                 |
| A large title for the app                        | [AppTitlebar](components/page-shell.md#apptitlebar)                                                 |
| A plain bar with left, centre and right slots    | [Bar](components/page-shell.md#bar)                                                                 |
| A light and dark mode switch                     | [ColourSchemeButton](components/page-shell.md#colourschemebutton)                                   |
| A logo or an image that changes with the mode    | [Logo](components/page-shell.md#logo), [ImageColourSchemeSwitch](components/page-shell.md#imagecolourschemeswitch)          |
| Login, logout and the signed-in user             | [User](components/page-shell.md#user), with [authentication](helpers/auth.md)                       |
| A scientific number, with limits and validation | [NumberInput](components/inputs-and-data.md#numberinput)                                                 |
| A visit identifier                               | [VisitInput](components/inputs-and-data.md#visitinput)                                                   |
| A spinner, or one that waits before showing      | [Progress](components/inputs-and-data.md#progress), [ProgressDelayed](components/inputs-and-data.md#progressdelayed)                  |
| A browsable stack of images                      | [ScrollableImages](components/inputs-and-data.md#scrollableimages)                                       |
| Values shown at a glance                         | [DataCard](components/inputs-and-data.md#datacard), [DataGroup](components/inputs-and-data.md#datagroup)                              |

Forms generated from a JSON schema are covered in [JsonForms](helpers/jsonforms.md). Tables use MUI with [Material React Table](components/material-react-table.md).
