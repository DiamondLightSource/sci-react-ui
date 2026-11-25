# SciReactUI

SciReactUI is the React implementation of the Diamond Design System. It is a theme, a set of design tokens and a small library of components, built on [MUI](https://mui.com/material-ui/) v7, for scientific applications.

This folder ships inside the installed package, so it always matches the version you are using. Start here, then follow the links for detail. The same guidance is also in [Storybook](https://diamondlightsource.github.io/sci-react-ui/), alongside live examples.

## Principles

- **Clarity over decoration.** Interfaces for experiments and data need to be read quickly and correctly.
- **Predictability over novelty.** Similar things look and behave alike across tools and beamlines.
- **Semantic structure over one-off styling.** Choose a colour for what it means, not for how it looks.
- **Accessibility and operational confidence.** Users should always know the state of the system and what they can do next.
- **Reuse before building.** Use an existing MUI or SciReactUI component before writing a new one.

## Set up

```sh
pnpm add @diamondlightsource/sci-react-ui
pnpm add @mui/icons-material react-icons   # peer dependencies, if you use icon-based components
```

```tsx
import "@diamondlightsource/sci-react-ui/font-styles.css";
import { ThemeProvider } from "@diamondlightsource/sci-react-ui";

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
```

`ThemeProvider` applies the Diamond theme and global styles. Light and dark mode are selected by the `data-mode` attribute on `<html>` (`"light"` or `"dark"`). Components must never choose colours by checking the mode themselves.

To avoid a flash of the wrong mode on first load, or to use your own palette, see [Installation](installation.md).

## How styling is layered

```text
DiamondDSTokens.css   --ds-* CSS variables   source of truth, one value set per mode
DiamondDSTheme.ts     MUI theme              adapts the tokens to MUI props and overrides
your component        theme / var(--ds-*)    consumes roles, never raw values
```

The two source files are in the [repository](https://github.com/DiamondLightSource/sci-react-ui/tree/main/src) (`src/styles/diamondDS/DiamondDSTokens.css` and `src/themes/DiamondDSTheme.ts`). They are not in the installed package, so [Theme colours](foundation/theme-colours.md) lists every token and value for both modes.

Your components consume roles. A hex value, a hand-picked grey or a one-off shadow in a component is a bug, because it will not follow the mode or the system's updates.

## Choosing colour

Full guidance: [Colour](foundation/colour.md), [Theme colours](foundation/theme-colours.md) (every token and value, per mode) and [Practical guidance](practical-guidance.md).

Structure comes from neutrals. Meaning comes from intents. Most of a dense scientific screen should be neutral, and intent colour should appear only when something changes state.

| You need                                                    | Use                                           | Token                                              |
| ----------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------- |
| Page, panel and card structure                              | Neutral surfaces                              | `--ds-background`, `--ds-surface`, `--ds-surface-container` |
| Text and icons on those surfaces                            | Neutral foregrounds                           | `--ds-on-surface`, `--ds-on-surface-variant`       |
| Dividers and outlines                                       | Borders                                       | `--ds-border-subtle`, `--ds-border-emphasis`       |
| Coloured text or an icon on a neutral surface               | Intent, main                                  | `--ds-<intent>`                                    |
| A quiet semantic surface (standard alert, status chip)      | Intent, container                             | `--ds-<intent>-container` with `--ds-on-<intent>-container` |
| A filled, high-emphasis element (contained button)          | Intent, solid                                 | `--ds-<intent>-solid` with `--ds-on-<intent>-solid` |

The intents are `primary`, `secondary`, `success`, `warning`, `error`, `info`. `brand` is separate and means Diamond identity only.

### Colour: do and don't

**Do**

- Pair a surface with its own foreground: `container` with `on-container`, `solid` with `on-solid`. Mixing pairs is how contrast failures get in.
- Use `secondary` for a distinct alternative path or mode, not for "second most important".
- Use `warning` and `error` only when attention or action is needed.
- Combine colour with a label, an icon with a different shape, or text, so meaning survives colour-blindness and glare.
- Keep chart and plot colours separate from interface colours.

**Don't**

- Don't hardcode hex, `rgb()` or named colours in components.
- Don't use `brand` to show status.
- Don't colour every row, metric or data point. If everything is highlighted, nothing is.
- Don't use large blocks of status colour as decoration or layout.
- Don't reuse the intent colours as a general chart palette.
- Don't compute a dark-mode colour from a light one. Each mode has its own hand-tuned values.

### Things that catch people out

- **`error` is `danger` in the tokens.** MUI props say `color="error"`, but the variables are `--ds-danger-*`. `--ds-error-container` does not exist.
- **`theme.palette.<intent>.main` does not follow the mode.** Inside `sx` or `styled()` it returns the default scheme's colour. Use `theme.vars.palette.primary.main` or `var(--ds-primary)` instead.
- **`alpha()`, `lighten()` and `darken()` throw on `var()` strings.** For transparency use the channel tokens: `rgb(var(--ds-primary-channel) / 0.12)`.
- **`tertiary` and `highlight` are tokens, not MUI colours.** `color="tertiary"` is not valid. Use `var(--ds-tertiary-container)` and friends directly.
- **Only colour has tokens.** There are no `--ds-space-*`, `--ds-radius-*` or `--ds-font-*` variables. Use `theme.spacing()` and the theme's typography variants.
- **Elevation tokens are flat colours, not shadows.** Prefer surface hierarchy, spacing and borders. Keep elevation for floating, temporary content such as menus and dialogs.
- **Only use token names that exist.** An unknown `--ds-*` variable silently resolves to nothing. Check the names in [Theme colours](foundation/theme-colours.md) rather than guessing.

## Interaction states

See [Colour](foundation/colour.md#6-interaction-states) for the full state model.

- **Focus** looks the same everywhere: a 2px ring using `--ds-focus-ring`, offset by `--ds-focus-ring-offset`. It shows keyboard position, never meaning, so it does not change with intent.
- **Hover and selected** layer an overlay on the surface (`--ds-overlay-hover`, `--ds-overlay-selected`) rather than swapping the background colour.
- **Priority when states collide:** disabled, then error, then selected, then active, then hover, then rest. Disabled and error always win.
- **Read-only is not disabled.** Read-only values stay readable, focusable and copyable. Use `disabled` only for controls that are genuinely unavailable, and say why.

## Using components

See [Working with components](working-with-components.md) for the standards, how to extend a component and when to create one, and [Practical guidance](practical-guidance.md) for surfaces, elevation and borders.

- Use MUI props (`variant`, `color`, `size`, `disabled`) before custom CSS.
- Extend a component only for a reusable need, such as a repeated workflow pattern. Don't extend one just to make a single screen look different.
- Name components by what they are, not where they first appear: `ScanStatus`, not `I18StatusBox`.
- Cover loading, empty, error, disabled and focus states in every new component, and check it in both modes.

What the package adds on top of MUI (each has a props table and an example in [Components](components.md)):

| Area                   | Components and helpers                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| Page shell             | `Navbar`, `NavLinks`, `Footer`, `Bar`, `SidebarNav`, `Breadcrumbs`, `NavMenu`, `AppTitlebar`, `Logo` |
| Mode and account       | `ColourSchemeButton`, `User`, `AuthProvider` ([Authentication](helpers/auth.md))                                              |
| Inputs for science     | `NumberInput`, `VisitInput`                                                                 |
| Progress               | `Progress`, `ProgressDelayed`                                                               |
| Data display           | `DataCard`, `ScrollableImages`                                                     |
| Tables                 | `DiamondDSIntegrations` and `useRowReorder` for Material React Table                          |
| Forms from a schema    | `JsonFormsControls` renderers ([JsonForms](helpers/jsonforms.md))                                                             |

Icons and logos: use [Lucide icons in new work](foundation/icons.md), and see [Logos](theme/logos.md) for setting a logo in the theme.

Standard MUI components: [what the theme changes](components/mui.md). Component guidance: [Buttons](components/buttons.md), [Text fields](components/text-field.md), [Tables](components/table.md) and [Material React Table](components/material-react-table.md). See also [Working with components](working-with-components.md) for the rules on extending or adding components.

## Layout

Use the established patterns rather than inventing a new arrangement for the same task: starting app, context panel, tabs and status, persistent and temporary drawers, inner workspace options and navigation, and modal pane. [Layout patterns](layout-patterns.md) shows each one with its regions.

## Typography

Full guidance: [Typography](foundation/typography.md).

- Use the theme's typography variants. Don't set font sizes by hand.
- Use the mono variants for values people need to inspect, compare or copy, such as paths, IDs and parameters. In a table, set only the technical cells in mono.
- Put a space between a number and its unit, and format consistently: `12.4 keV`, `0.5 s`, `1,024 frames`. Not `12.4keV` or `0.5sec`.
- If you truncate a long value with `noWrap`, give users a way to read it in full, such as a tooltip that also opens on keyboard focus.

## Accessibility

Full guidance: [overview](accessibility/overview.md), [colour contrast and vision](accessibility/colour-contrast.md) and [cognitive accessibility](accessibility/cognitive.md).

- WCAG 2.2 is the minimum. APCA is used as well, because a pair that technically passes can still be hard to read.
- Every interactive element works with a keyboard, has a visible focus ring and an accessible name. Icon-only buttons need a label.
- Never carry meaning by colour alone.
- Check any new foreground and background pairing in both modes. A pair that passes in light can fail in dark.
- Write labels and errors that say what will happen or what went wrong, not "OK" or "Something went wrong".

## Designing for scientific work

These suggestions apply to data-heavy and instrument-facing tools. Use the ones that fit your app.

**Keep the working context visible.** If your app works within a visit, proposal or similar container, don't let users lose track of which one they are acting on, and make the current one hard to change by accident.

**If your app sends commands to instruments, treat them as commands, not form saves.**

- Validate values against real limits before sending them, not just for format.
- Show what the system is doing while it runs. A parameter form with no live status is half a screen.
- Keep Abort or Stop reachable and unambiguous while anything is running. Never put it behind a menu or disable it because the run is mid-step.
- Only enable controls that are valid for the actual state. Pause only while running, Resume only while paused.
- Represent more states than idle, loading and error: for example running, pausing, paused, stopping, aborting, faulted and unknown.
- Show "unknown" (connection lost) as different from "idle". A dead connection must never look like a calm system.
- When pausing has more than one meaning, such as stop now or finish to the next safe point, let the user choose instead of picking one silently.

**Make failures specific.** (Details: [Feedback and errors](feedback-and-errors.md).) Say what failed and, if a person may need to act physically, what to check. Pair an error with a way to recover, retry or skip.

**Design for walking away.** If work is queued or long-running, show its overall state clearly: what is running, what is next, what failed and what is waiting. A failed item should be diagnosable and skippable without stopping the rest.

**Don't colour for volume.** In a live, dense view, a few clear signals beat many coloured ones. Don't show several competing status colours in one view.

**Lock values without hiding them.** When values must not change during a run, make them read-only, not disabled, so they stay visible and copyable.

**Be careful with irreversible actions.** Use a confirmation step for destructive or costly actions, name exactly what will be lost, and keep destructive buttons away from safe primary ones.

**Be cautious with progress.** (See [Feedback and errors](feedback-and-errors.md#progress-and-transitional-states).) Show progress only when you can measure it. Use `ProgressDelayed` for work that is usually quick, so a spinner doesn't flash.

## All pages

- [Installation](installation.md): setup, your own palette, avoiding dark mode flicker.
- [Practical guidance](practical-guidance.md): using the theme, colour, surfaces and elevation, borders, typography.
- [Feedback and errors](feedback-and-errors.md): status, progress, success feedback, actionable errors, recovery and safety.
- [Working with components](working-with-components.md): standards, extending and creating components.
- [Layout patterns](layout-patterns.md): regions and nine page patterns.
- Foundation: [Colour](foundation/colour.md), [Theme colours](foundation/theme-colours.md), [Typography](foundation/typography.md), [Icons](foundation/icons.md).
- Accessibility: [Overview](accessibility/overview.md), [Colour contrast and vision](accessibility/colour-contrast.md), [Cognitive accessibility](accessibility/cognitive.md).
- [Components](components.md): every SciReactUI component with props, an example and notes from the stories, in three pages: [page shell and identity](components/page-shell.md), [navigation](components/navigation.md) and [inputs, progress and data](components/inputs-and-data.md).
- Components: [MUI components](components/mui.md), [Buttons](components/buttons.md), [Text fields](components/text-field.md), [Tables](components/table.md), [Material React Table](components/material-react-table.md).
- Helpers: [Authentication](helpers/auth.md), [JsonForms](helpers/jsonforms.md).
- Theme: [Logos](theme/logos.md).

## Before you ship

- [ ] No raw colours, and every `--ds-*` name exists.
- [ ] Each surface is paired with its own foreground.
- [ ] It works in light and dark, with the mode set only through `data-mode`.
- [ ] Focus, disabled, read-only, loading, empty and error states are handled.
- [ ] Keyboard use works end to end, and meaning is never colour alone.
- [ ] One main action per decision area, and destructive actions are separated and confirmed.
- [ ] Numbers carry units, and long values can be read in full.
- [ ] Existing components and layout patterns were used before anything new.
