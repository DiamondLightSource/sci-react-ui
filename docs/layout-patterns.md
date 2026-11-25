# Layout patterns

Skeleton diagrams showing Diamond applications' core interface regions, such as navigation, workspace controls, content and auxiliary drawers, combined into reusable layouts. These patterns cover desktop screens.

The patterns are examples, not fixed templates. Mix and match regions to suit your application.

Start with the simplest pattern that fits and add regions only when the task needs them.

Pattern names are provisional. Some regions have no SciReactUI component yet. The Components column says which.

## Example: starting app

The simplest pattern: a global header (A), primary navigation (B) and the workspace (E). It is pattern 1 below.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬▬▬                           Global utilities  □ □ □ │
├────────────────┬──────────────────────────────────────────────────────────────┤
│ B · Primary    │                                                              │
│ navigation     │                                                              │
│                │                                                              │
│ □ ▬▬▬▬▬▬       │                                                              │
│ □ ▬▬▬▬         │                                                              │
│ ▶ ▬▬▬▬▬▬▬      │                                                              │
│ □ ▬▬▬▬▬        │                    E · Primary workspace                     │
│ □ ▬▬▬▬▬▬       │                                                              │
│                │                       Content viewport                       │
│                │                                                              │
│                │                                                              │
│ ────────────── │                                                              │
│ actions / text │                                                              │
│ [ ▬▬▬▬▬▬▬▬ ]   │                                                              │
│ Some more text │                                                              │
└────────────────┴──────────────────────────────────────────────────────────────┘
```

A starting app in code: an `AppBar` (A) over a `SidebarNav` (B) and the workspace (E). The `AppBar` needs a higher `zIndex` because MUI draws the permanent drawer above everything else. For the full version, see the "With app bar" story under Components, Navigation, SidebarNav in [Storybook](https://diamondlightsource.github.io/sci-react-ui/).

```tsx
import { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu, Science } from "@mui/icons-material";
import {
  ColourSchemeButton,
  Logo,
  SidebarNav,
} from "@diamondlightsource/sci-react-ui";

const navigation = [
  {
    navItems: [
      { label: "Acquisition", icon: <Science />, linkProps: { href: "/acquisition" }, selected: true },
    ],
  },
];

export const App = () => {
  const [open, setOpen] = useState(true);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton edge="start" aria-label="menu" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Logo />
          <Box sx={{ ml: "auto" }}>
            <ColourSchemeButton />
          </Box>
        </Toolbar>
      </AppBar>
      <SidebarNav navigation={navigation} open={open} setOpen={setOpen} />
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Typography>Workspace content</Typography>
      </Box>
    </Box>
  );
};
```

Each navigation item takes either `linkProps: { href }` for a plain link, or `linkProps: { component, to }` for a router link, such as `component: NavLink` from React Router. Use `footerSlot` for the "actions / text" block at the foot of the sidebar.

## Legend

| Symbol | Meaning                                  |
| ------ | ---------------------------------------- |
| □      | Icon or control                          |
| ▬      | Placeholder text                         |
| ▶      | Selected item                            |
| ▴ ▾    | Expanded or collapsed group              |
| ✕      | Close control                            |
| [ ]    | Field or button                          |
| ║ ═    | Overlay edge: floats above the content  |

## Regions

Every region has a letter. E is the whole workspace. Patterns 1 to 5 and 9 draw it as one block of content. Pattern 6 adds a toolbar (E3). Patterns 7 and 8 split it into example parts, E1 to E4, listed after this table. Use the SciReactUI component where there is one. Otherwise compose from MUI.

| Region                     | Details                                                                                                                                                                                                      | Components                                                                                                                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A** · Global header      | App identity, breadcrumb (patterns 5 to 9), global actions, search and account controls. Size: 48 px high.                                                                                                  | `Navbar`, or MUI `AppBar` with `Toolbar`. `Logo`, `User` and `ColourSchemeButton` for identity and utilities. Search: MUI `TextField`. Breadcrumb: to be decided. The SciReactUI `Breadcrumbs` is a separate bar, not the header breadcrumb.                  |
| **B** · Primary navigation | Navigation between the app's main destinations. Size: 256 px rail.                                                                                                                                           | `SidebarNav`. Use `footerSlot` for the "actions / text" block at the foot.                                                                                                                                                                                   |
| **C** · Context panel      | Items that set what the workspace shows, outside the workspace. Either links to other content, or a list of items of the same kind to choose from, as cards or a tree. Size: max 320 px rail.                | Links to other content: `SubNav` (once available). Choosing items: `ContextPanel` (cards or tree option, once available). Search or filter field: MUI `TextField`.                                                                                            |
| **D** · Workspace selector | Tabs for switching between open or available workspaces.                                                                                                                                                     | MUI `Tabs` and `Tab`.                                                                                                                                                                                                                                        |
| **E** · Primary workspace  | The active workspace and its task-specific interface. The container for any of E1 to E4, or just content when it is not split. Size: flexible.                                                              | Your own content, or E1 to E4.                                                                                                                                                                                                                               |
| **F** · Auxiliary pane     | Supporting information or tools beside or below the primary workspace. It can be driven by the workspace. Size: dynamic, up to about 75% wide on the right.                                                  | MUI `Drawer`: `persistent` to sit alongside the workspace, `temporary` to open over it. Anchor `right` or `bottom`. Toolbar, status and actions: `Toolbar`, `Divider`, `Typography`, `Button`.                                                                |
| **G** · Global status      | App-wide connection, synchronisation, background activity or system status. Size: 29 px high.                                                                                                                | Not yet available. A new component is planned.                                                                                                                                                                                                               |
| **H** · Modal pane         | A pane laid over existing content, for a form or other content. It holds the user's focus until closed. For a short confirmation or warning, use an alert dialog instead.                                   | MUI `Dialog`, sized for a form or content. Give it a title and link it with `aria-labelledby`.                                                                                                                                                              |

### Example workspace parts

Patterns 7 and 8 split E into parts, and pattern 6 adds the toolbar (E3). E1 to E4 are examples of how to do that, not fixed regions. Use the ones the task needs.

| Part                         | Details                                                                                                                   | Components                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **E1** · Workspace content    | The content itself: canvas, document, table or editor. The workspace selector (D) switches between open items or views.  | Your own content. For tables, see the MUI `Table` and Material React Table guidance pages. |
| **E2** · Workspace navigation | Internal navigation lists or trees that update the workspace content. Mainly used when the workspace has tabs (D).       | MUI `List`, with a `TextField` for search or filter.                                      |
| **E3** · Workspace toolbar    | Local tools, view controls and contextual actions.                                                                        | `Bar`, or MUI `Toolbar`.                                                                  |
| **E4** · Workspace status     | Selection counts, validation or progress for the active workspace only.                                                   | `Bar`, or MUI `Toolbar`.                                                                  |

For the table guidance, see [Table](components/table.md) and [Material React Table](components/material-react-table.md).

## The patterns

### 1. Starting app

Desktop shell with a global header, a navigation rail and a flexible workspace.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬▬▬                           Global utilities  □ □ □ │
├────────────────┬──────────────────────────────────────────────────────────────┤
│ B · Primary    │                                                              │
│ navigation     │                                                              │
│                │                                                              │
│ □ ▬▬▬▬▬▬       │                                                              │
│ □ ▬▬▬▬         │                                                              │
│ ▶ ▬▬▬▬▬▬▬      │                                                              │
│ □ ▬▬▬▬▬        │                    E · Primary workspace                     │
│ □ ▬▬▬▬▬▬       │                                                              │
│                │                       Content viewport                       │
│                │                                                              │
│                │                                                              │
│ ────────────── │                                                              │
│ actions / text │                                                              │
│ [ ▬▬▬▬▬▬▬▬ ]   │                                                              │
│ Some more text │                                                              │
└────────────────┴──────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`
- **B** Primary navigation: `SidebarNav`
- **E** Primary workspace: Your own content

### 2. Context panel

Streamlined desktop shell with persistent header, primary navigation, context panel, and a flexible workspace.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬▬▬                           Global utilities  □ □ □ │
├────────────────┬────────────────┬─────────────────────────────────────────────┤
│ B · Primary    │ C · Context    │                                             │
│ navigation     │ panel          │                                             │
│                │                │                                             │
│ □ ▬▬▬▬▬▬       │ Secondary      │                                             │
│ □ ▬▬▬▬         │ navigation     │                                             │
│ ▶ ▬▬▬▬▬▬▬      │ ▶ ▬▬▬▬▬▬▬      │                                             │
│ □ ▬▬▬▬▬        │ □ ▬▬▬▬▬        │            E · Primary workspace            │
│ □ ▬▬▬▬▬▬       │ □ ▬▬▬▬▬▬▬▬     │                                             │
│                │ □ ▬▬▬          │               Content viewport              │
│                │ □ ▬▬▬▬▬▬       │                                             │
│                │ □ ▬▬▬▬▬        │                                             │
│ ────────────── │                │                                             │
│ actions / text │                │                                             │
│ [ ▬▬▬▬▬▬▬▬ ]   │                │                                             │
│ Some more text │                │                                             │
└────────────────┴────────────────┴─────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`
- **B** Primary navigation: `SidebarNav`
- **C** Context panel: use a local component for now (`SubNav`, once available)
- **E** Primary workspace: Your own content

### 3. Tabs and status

Desktop shell with a global header, a navigation rail, a tabbed workspace and a global status bar.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬▬▬                           Global utilities  □ □ □ │
├────────────────┬──────────────────────────────────────────────────────────────┤
│ B · Primary    │ D · Workspace selector                                       │
│ navigation     │ □ ▬▬▬▬▬▬   □ ▬▬▬▬▬▬   □ ▬▬▬▬▬▬                               │
│                ├──────────────────────────────────────────────────────────────┤
│ □ ▬▬▬▬▬▬       │                                                              │
│ □ ▬▬▬▬         │                                                              │
│ ▶ ▬▬▬▬▬▬▬      │                                                              │
│ □ ▬▬▬▬▬        │                                                              │
│ □ ▬▬▬▬▬▬       │                                                              │
│                │                    E · Primary workspace                     │
│                │                                                              │
│                │                       Content viewport                       │
│ ────────────── │                                                              │
│ actions / text │                                                              │
│ [ ▬▬▬▬▬▬▬▬ ]   │                                                              │
│ Some more text │                                                              │
├────────────────┴──────────────────────────────────────────────────────────────┤
│ G · Global status                                                 ▬▬▬▬▬▬  ▬▬▬ │
└───────────────────────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`
- **B** Primary navigation: `SidebarNav`
- **D** Workspace selector: MUI `Tabs`
- **E** Primary workspace: Your own content
- **G** Global status: New component, not yet available

### 4. Persistent side drawer

Desktop shell with a context panel, a docked side drawer beside the workspace and a global status footer.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬▬▬                           Global utilities  □ □ □ │
├────────────────┬────────────────┬────────────────────────┬────────────────────┤
│ B · Primary    │ C · Context    │                        │ F · Auxiliary  □ □ │
│ navigation     │ panel          │                        │                    │
│                │ [Search/filter]│                        │ Secondary content  │
│ □ ▬▬▬▬▬▬       │ [▬▬▬] [▬▬▬]    │                        │ ▬▬▬▬▬▬▬▬▬▬▬▬       │
│ □ ▬▬▬▬         │                │                        │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬     │
│ ▶ ▬▬▬▬▬▬▬      │ Item list      │                        │ ▬▬▬▬▬▬▬▬▬          │
│ □ ▬▬▬▬▬        │ ▶ ▬▬▬▬▬  ▬▬    │ E · Primary workspace  │ ▬▬▬▬▬▬▬▬▬▬▬▬▬      │
│ □ ▬▬▬▬▬▬       │ □ ▬▬▬▬▬  ▬▬    │                        │ ▬▬▬▬▬▬▬▬▬▬         │
│                │ □ ▬▬▬▬▬  ▬▬    │    Content viewport    │ ▬▬▬▬▬▬▬▬▬▬▬▬       │
│                │ □ ▬▬▬▬▬  ▬▬    │                        │                    │
│                │ □ ▬▬▬▬▬  ▬▬    │                        │ ────────────────── │
│ ────────────── │ □ ▬▬▬▬▬  ▬▬    │                        │ Local status       │
│ actions / text │                │                        │ ────────────────── │
│ [ ▬▬▬▬▬▬▬▬ ]   │                │                        │ Local actions      │
│ Some more text │                │                        │   [ ▬▬ ] [ ▬▬ ]    │
├────────────────┴────────────────┴────────────────────────┴────────────────────┤
│ G · Global status                                                 ▬▬▬▬▬▬  ▬▬▬ │
└───────────────────────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`
- **B** Primary navigation: `SidebarNav`
- **C** Context panel: use a local component for now (`ContextPanel` with cards, once available)
- **E** Primary workspace: Your own content
- **F** Auxiliary pane: MUI `Drawer` (persistent, right)
- **G** Global status: New component, not yet available

### 5. Persistent bottom drawer

Desktop shell with a breadcrumb, a context panel, a persistent bottom drawer below the workspace, and a global status footer.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬ / ▬▬▬▬▬ / ▬▬▬▬▬             Global utilities  □ □ □ │
├────────────────┬────────────────┬─────────────────────────────────────────────┤
│ B · Primary    │ C · Context    │                                             │
│ navigation     │ panel          │                                             │
│                │ [Search/filter]│                                             │
│ □ ▬▬▬▬▬▬       │ [▬▬▬] [▬▬▬]    │            E · Primary workspace            │
│ □ ▬▬▬▬         │                │                                             │
│ ▶ ▬▬▬▬▬▬▬      │ Item list      │               Content viewport              │
│ □ ▬▬▬▬▬        │ ▶ ▬▬▬▬▬  ▬▬    │                                             │
│ □ ▬▬▬▬▬▬       │ □ ▬▬▬▬▬  ▬▬    │                                             │
│                │ □ ▬▬▬▬▬  ▬▬    ├─────────────────────────────────────────────┤
│                │ □ ▬▬▬▬▬  ▬▬    │ F · Auxiliary pane                    □ □   │
│                │ □ ▬▬▬▬▬  ▬▬    │ Secondary content                           │
│ ────────────── │ □ ▬▬▬▬▬  ▬▬    │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬           │
│ actions / text │                │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬        │
│ [ ▬▬▬▬▬▬▬▬ ]   │                │ ▬▬▬▬▬▬▬▬▬▬▬▬       ▬▬▬▬▬▬▬▬▬▬▬▬▬            │
│ Some more text │                │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬           │
├────────────────┴────────────────┴─────────────────────────────────────────────┤
│ G · Global status                                                 ▬▬▬▬▬▬  ▬▬▬ │
└───────────────────────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`, plus a breadcrumb trail (component to be decided)
- **B** Primary navigation: `SidebarNav`
- **C** Context panel: use a local component for now (`ContextPanel` with cards, once available)
- **E** Primary workspace: Your own content
- **F** Auxiliary pane: MUI `Drawer` (persistent, bottom)
- **G** Global status: New component, not yet available

### 6. Temporary side drawer

Desktop shell with a breadcrumb, a workspace toolbar, an on-demand side drawer over the workspace and a global status footer. Selecting a row in a table view can open the drawer with that row's details. The drawer can hold different kinds of content, such as a form or tabbed views. Make it wider for larger content, up to about 75% of the width.

The workspace behind the drawer can behave in two ways:

- Blocked: clicking outside closes the drawer. This is the default for a `temporary` `Drawer`.
- Still usable: selecting another row swaps the drawer's content. In MUI, set `hideBackdrop`, `disableEnforceFocus`, `disableAutoFocus` and `disableScrollLock`, and `pointerEvents: "none"` on the drawer's root, and keep the drawer itself interactive. There is no single prop for it.

Review the requirements before choosing "still usable". A `temporary` `Drawer` is a modal, so it can still hide the rest of the page from screen readers and close on Escape. Test keyboard and screen-reader access to the workspace. If it cannot be reached that way, keep the workspace blocked.

With the default backdrop the whole screen is dimmed and blocked. With `hideBackdrop` nothing is dimmed, and the workspace stays usable. The diagram does not draw the backdrop.

The drawer sits between the global header and the global status bar, so the header stays visible. MUI's backdrop still covers the whole screen. By default a `temporary` `Drawer` is full height and covers the header. To get this layout, set `top` and `height` on the drawer's paper.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬ / ▬▬▬▬▬ / ▬▬▬▬▬             Global utilities  □ □ □ │
├────────────────┬────────────────────────╥─────────────────────────────────────┤
│ B · Primary    │ E3 · Workspace toolbar ║ F · Auxiliary pane       □ □ ✕      │
│ navigation     ├────────────────────────╢ ▬▬▬▬▬▬▬▬▬▬                          │
│                │ E · Primary workspace  ║ □ ▬▬▬▬▬▬   □ ▬▬▬▬▬▬   □ ▬▬▬▬        │
│ □ ▬▬▬▬▬▬       │                        ╟─────────────────────────────────────┤
│ □ ▬▬▬▬         │ □  ▬▬▬  ▬▬▬  ▬▬▬  ▬▬   ║ ▬▬▬▬▬▬       ▬▬▬▬▬▬▬▬▬▬▬            │
│ ▶ ▬▬▬▬▬▬▬      ├────────────────────────╢ ▬▬▬▬▬▬▬▬     ▬▬▬▬▬▬▬▬               │
│ □ ▬▬▬▬▬        │ ▶  ▬▬   ▬▬▬  ▬▬   ▬▬▬  ║ ▬▬▬▬▬        ▬▬▬▬▬▬▬▬▬▬▬▬           │
│ □ ▬▬▬▬▬▬       │ □  ▬▬▬  ▬▬   ▬▬▬  ▬▬   ║ ▬▬▬▬▬▬▬      ▬▬▬▬▬▬▬▬▬▬             │
│                │ □  ▬▬   ▬▬▬  ▬▬▬  ▬▬   ║ ▬▬▬▬         ▬▬▬▬▬▬▬▬▬▬▬            │
│                │ □  ▬▬▬  ▬▬   ▬▬   ▬▬▬  ║                                     │
│                │ □  ▬▬   ▬▬▬  ▬▬▬  ▬▬   ║                                     │
│ ────────────── │ □  ▬▬▬  ▬▬   ▬▬▬  ▬▬   ╟─────────────────────────────────────┤
│ actions / text │                        ║ Local status                        │
│ [ ▬▬▬▬▬▬▬▬ ]   ├────────────────────────╫─────────────────────────────────────┤
│ Some more text │ 1–6 of 48          □ □ ║ Local actions  [ ▬▬ ] [ ▬▬ ]        │
├────────────────┴────────────────────────╨─────────────────────────────────────┤
│ G · Global status                                                 ▬▬▬▬▬▬  ▬▬▬ │
└───────────────────────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`, plus a breadcrumb trail (component to be decided)
- **B** Primary navigation: `SidebarNav`
- **E** Primary workspace: Your own content, such as a table view
- **E3** Workspace toolbar: `Bar`, or MUI `Toolbar`
- **F** Auxiliary pane: MUI `Drawer` (temporary, right), with MUI `Tabs` for tabbed content
- **G** Global status: New component, not yet available

### 7. Inner workspace options

Desktop shell with context panel, tabs, toolbar, content, inspector, and local status.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬ / ▬▬▬▬▬ / ▬▬▬▬▬             Global utilities  □ □ □ │
├────────────────┬────────────────┬─────────────────────────────────────────────┤
│ B · Primary    │ C · Context    │ D · Workspace selector                      │
│ navigation     │ panel          │ □ ▬▬▬▬▬▬   □ ▬▬▬▬▬▬   □ ▬▬▬▬▬▬              │
│                │ [Search/filter]├──────────────────────┬──────────────────────┤
│ □ ▬▬▬▬▬▬       │ [▬▬▬] [▬▬▬]    │E3 · Workspace toolbar│ F · Auxiliary  □ □ ✕ │
│ □ ▬▬▬▬         │                ├──────────────────────┼──────────────────────┤
│ ▶ ▬▬▬▬▬▬▬      │ □ ▬▬▬▬▬▬▬    ▴ │                      │ Secondary content    │
│ □ ▬▬▬▬▬        │   ▶ ▬▬▬▬▬      │                      │ ▬▬▬▬▬▬▬▬▬▬▬▬         │
│ □ ▬▬▬▬▬▬       │   □ ▬▬▬▬▬      │                      │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬       │
│                │ □ ▬▬▬▬▬▬▬    ▾ │                      │ ▬▬▬▬▬▬▬▬▬            │
│                │ □ ▬▬▬▬▬▬▬    ▾ │                      │ ▬▬▬▬▬▬▬▬▬▬▬▬▬        │
│                │ □ ▬▬▬▬▬▬▬    ▾ │E1 · Workspace content│ ▬▬▬▬▬▬▬▬▬▬           │
│                │                │                      │                      │
│                │                │   Content viewport   │ ──────────────────── │
│                │                │                      │ Local status         │
│                │                │                      │ ──────────────────── │
│ ────────────── │                │                      │ Local actions        │
│ actions / text │                │                      │   [ ▬▬ ] [ ▬▬ ]      │
│ [ ▬▬▬▬▬▬▬▬ ]   │                ├──────────────────────┴──────────────────────┤
│ Some more text │                │ E4 · Workspace status           ▬▬▬▬▬  ▬▬▬  │
├────────────────┴────────────────┴─────────────────────────────────────────────┤
│ G · Global status                                                 ▬▬▬▬▬▬  ▬▬▬ │
└───────────────────────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`, plus a breadcrumb trail (component to be decided)
- **B** Primary navigation: `SidebarNav`
- **C** Context panel: use a local component for now (`ContextPanel` with a tree, once available)
- **D** Workspace selector: MUI `Tabs`
- **E1** Workspace content: Your own content
- **E3** Workspace toolbar: `Bar`, or MUI `Toolbar`
- **E4** Workspace status: `Bar`, or MUI `Toolbar`
- **F** Auxiliary pane: MUI `Drawer` (persistent, right)
- **G** Global status: New component, not yet available

### 8. Inner workspace navigation

Desktop shell with tabs, workspace navigation, content.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬ / ▬▬▬▬▬ / ▬▬▬▬▬             Global utilities  □ □ □ │
├────────────────┬──────────────────────────────────────────────────────────────┤
│ B · Primary    │ D · Workspace selector                                       │
│ navigation     │ □ ▬▬▬▬▬▬   □ ▬▬▬▬▬▬   □ ▬▬▬▬▬▬                               │
│                ├──────────────────────┬───────────────────────────────────────┤
│ □ ▬▬▬▬▬▬       │ E2 · Workspace       │                                       │
│ □ ▬▬▬▬         │ navigation           │                                       │
│ ▶ ▬▬▬▬▬▬▬      │ [Search/filter]      │                                       │
│ □ ▬▬▬▬▬        │ [▬▬▬] [▬▬▬]          │                                       │
│ □ ▬▬▬▬▬▬       │                      │                                       │
│                │ Item list            │         E1 · Workspace content        │
│                │ ▶ ▬▬▬▬▬  ▬▬          │                                       │
│                │ □ ▬▬▬▬▬  ▬▬          │            Content viewport           │
│ ────────────── │ □ ▬▬▬▬▬  ▬▬          │                                       │
│ actions / text │ □ ▬▬▬▬▬  ▬▬          │                                       │
│ [ ▬▬▬▬▬▬▬▬ ]   │ □ ▬▬▬▬▬  ▬▬          │                                       │
│ Some more text │                      │                                       │
├────────────────┴──────────────────────┴───────────────────────────────────────┤
│ G · Global status                                                 ▬▬▬▬▬▬  ▬▬▬ │
└───────────────────────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`, plus a breadcrumb trail (component to be decided)
- **B** Primary navigation: `SidebarNav`
- **D** Workspace selector: MUI `Tabs`
- **E1** Workspace content: Your own content
- **E2** Workspace navigation: MUI `List`
- **G** Global status: New component, not yet available

### 9. Modal pane

Desktop shell with a modal pane for a form or other content, laid over the workspace. A backdrop, not drawn here, dims and blocks the whole screen, including the header and navigation.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ □ A · Global header ▬▬▬▬▬ / ▬▬▬▬▬ / ▬▬▬▬▬             Global utilities  □ □ □ │
├────────────────┬──────────────────────────────────────────────────────────────┤
│ B · Primary    │ E · Primary workspace                                        │
│ navigation     │          ╔═══════════════════════════════════════╗           │
│                │ □  ▬▬▬▬▬▬║ H · Modal pane                    □ ✕ ║           │
│ □ ▬▬▬▬▬▬       │──────────╢ ───────────────────────────────────── ╟───────────│
│ □ ▬▬▬▬         │ ▶  ▬▬▬▬▬▬║ Form or content                       ║           │
│ ▶ ▬▬▬▬▬▬▬      │ □  ▬▬▬▬▬▬║ ▬▬▬▬▬▬                                ║           │
│ □ ▬▬▬▬▬        │ □  ▬▬▬▬▬ ║ [ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ]           ║           │
│ □ ▬▬▬▬▬▬       │ □  ▬▬▬▬▬▬║ ▬▬▬▬▬▬▬▬                              ║           │
│                │ □  ▬▬▬▬▬▬║ [ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ]           ║           │
│                │ □  ▬▬▬▬▬▬║ ───────────────────────────────────── ║           │
│                │ □  ▬▬▬▬▬▬║ Local actions           [ ▬▬ ] [ ▬▬ ] ║           │
│ ────────────── │ □  ▬▬▬▬▬ ╚═══════════════════════════════════════╝           │
│ actions / text │                                                              │
│ [ ▬▬▬▬▬▬▬▬ ]   │──────────────────────────────────────────────────────────────│
│ Some more text │ 1–10 of 48                                               □ □ │
└────────────────┴──────────────────────────────────────────────────────────────┘
```

Components:

- **A** Global header: `Navbar`, or MUI `AppBar`, plus a breadcrumb trail (component to be decided)
- **B** Primary navigation: `SidebarNav`
- **E** Primary workspace: Your own content, such as a table view
- **H** Modal pane: MUI `Dialog`
