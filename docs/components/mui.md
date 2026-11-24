# MUI components

Use standard MUI components for everything the package doesn't add. The ones it does add are in [Components](../components.md). The Diamond theme applies to MUI components automatically under `ThemeProvider`, so you don't restyle them.

Style them with MUI props such as `color`, `variant`, `size` and `disabled`, never with custom CSS or raw colours. MUI documents each component's props and API at [v7.mui.com/material-ui](https://v7.mui.com/material-ui/all-components/). This package uses MUI v7.

## Across all components

- **Intents:** `color` accepts `primary`, `secondary`, `success`, `warning`, `error` and `info`. An unknown colour falls back to `primary` (`success` for `Alert` severity). `brand`, `tertiary` and `highlight` are not valid values. See [Colour](../foundation/colour.md).
- **Focus:** keyboard focus is one shared ring (`--ds-focus-ring`, 2px, offset 2px) on the themed controls. It does not change with intent.
- **Hover and press:** most controls layer a translucent overlay on the surface instead of swapping its colour.
- **Disabled and error:** these states win over hover, focus and selected styling.
- **Text transform:** buttons, toggle buttons and tabs do not uppercase their labels.

## What the theme changes

| Component | What the theme changes | How to use it |
| --- | --- | --- |
| `Button` | `contained` is a solid action surface, `outlined` a subtle intent container with a border, `text` is low emphasis. No shadow. `color="inherit"` stays neutral. | `primary contained` for the main action. See [Button guidance](buttons.md). |
| `IconButton` | Same intent model as `Button`. Default and `inherit` stay neutral. Hover tints with the intent's container colour. | Set `color` only when the icon carries meaning. |
| `ButtonGroup` | No shadows. Contained groups use the hover and press overlays. Disabled buttons use the subtle border. | Use as normal. |
| `ToggleButton` | Emphasis border. Selected buttons use the selected overlay, or with `color="primary"` the primary container with an accent border. | Use `color="primary"` for a prominent selection. |
| `Chip` | Default chips are neutral with an emphasis border. Intent chips are solid, or `outlined` with a container fill and accent border. Only clickable or deletable chips get the focus ring and overlays. | Use a coloured chip for status. Keep metadata neutral. |
| `Alert` | Status intents only, set with `severity`. Standard and outlined use the container colour, filled uses the solid colour. 8px radius. | See [Feedback and errors](../feedback-and-errors.md). |
| `TextField`, `Input`, `OutlinedInput`, `FilledInput`, `Select`, `InputLabel` | Outlined fields have a `surface` fill so they stand out on tinted surfaces. State priority is disabled, error, focused, read-only, hover, default. Read-only keeps legible text, a quieter border and its own surface tone, and a read-only `Select` mutes its chevron. Disabled is more muted. Placeholders and labels use tokens, and the label follows `color` on focus. | Use `readOnly` to lock a value, not `disabled`. See [Text field guidance](text-field.md). |
| `Autocomplete` | The listbox uses the elevation 8 tone and shadow, the same as `Menu` and `Select`. | Use as normal. |
| `Menu`, `Select` dropdown, `Popover` | The floating panel keeps its shadow. | Use as normal. |
| `Tabs`, `Tab` | 44px minimum height. The selected tab has primary text and a 2px underline, and the indicator uses the primary accent. | Use as normal. |
| `Checkbox`, `Radio` | Ripple off. Checked uses the intent colour (default `primary`), or neutral text for `color="default"`. Hover tints the control. Disabled uses the disabled control token. | Use `color` only for meaning. |
| `LinearProgress`, `CircularProgress` | Default `color="info"`. The linear bar is 6px high with a rounded track. The colour is an activity signal, not a filled surface. | See [Feedback and errors](../feedback-and-errors.md#progress-and-transitional-states). |
| `Skeleton` | Placeholders use the strong container tone. The wave shimmer uses the hover overlay. | Use as normal. |
| `Snackbar` | The message surface is the container tone with a subtle border, 8px radius and a shadow. Content and `Alert` are 320 to 560px wide. | Use as normal. |
| `Paper` (also `Card`, `Accordion`, `AppBar`) | Hierarchy comes from tone, not shadow. No shadow and no default border. `elevation` above 0 sets the background from the elevation tokens. | `variant="outlined"` for a border. A custom background hides the elevation tint. See [Practical guidance](../practical-guidance.md#surfaces-and-elevation). |
| `Card` | Flat, except `raised`, which adds a shadow. | Use `raised` for interactive cards, not a manual `elevation`. |
| `Dialog` | Default elevation 16 with a shadow. The legacy `PaperProps` is ignored. | Customise with `slotProps.paper`. |
| `Drawer` | Default elevation 4. Only the temporary variant has a shadow. Permanent and persistent drawers are flat. | Use as normal. |
| `Avatar` | A fallback (letters or icon) uses the strong container tone with normal text. | Use as normal. |
| `Table` (`TableCell`, `TableContainer`) | Header cells use the container tone, and a sticky header adds an emphasis bottom border. The container has a `surface` fill, subtle border, 8px radius, no shadow and no border under the last row. | See [Table guidance](table.md) and [Material React Table](material-react-table.md). |
| `ButtonBase` | Ripple stays on. Focus ripple is off, because the focus ring is used instead. | Applies to every clickable component. |
| Typography, `CssBaseline` | Variants come from the theme typography. `code`, `kbd`, `samp` and `pre` use the mono font, and `pre` scrolls horizontally. | See [Typography](../foundation/typography.md). |

## Notes from the stories

**Inputs**

- **Autocomplete:** `freeSolo` mode lets users enter values that aren't in the options list. It behaves like a text input with suggestions, not a strict selector.

**Data display**

- **Badge:** shown on different child icons.
- **Chip:** chips can be removed by the user, and the Reset button restores the initial set.
- **Table:** a warning tint reinforces the status chip and never replaces it.
- **Typography:**
  - The weight, line height and letter spacing tokens underpin the variants. Prefer the variants. Use the tokens to build new variants or components.
  - `color` accepts palette intents and semantic text roles such as `text.primary`. Prefer text roles for ordinary text, and reserve intents for status or brand emphasis.
  - `variant` sets the visual size and weight, and `component` sets the HTML element. They don't have to match, so a heading can be `h1` in the document outline and smaller visually.
  - To truncate a long technical value, use `noWrap` in a width-constrained container with a `Tooltip`, so the full value is available on hover or focus.

**Feedback**

- **CircularProgress:** shown in different sizes, and determinate.
- **LinearProgress:** determinate with different values, and with value labels.

**Navigation**

- **Breadcrumbs:** not to be confused with the package's own [Breadcrumbs](navigation.md#breadcrumbs).

**Surfaces**

- **AppBar:** not to be confused with the package's [AppTitlebar](page-shell.md#apptitlebar).
- **Paper:** a custom background colour overrides the visual effect of elevation.

## Components with no theme changes

These MUI components have no override or default of their own. They follow the base theme (colours, typography and focus ring) only: `Badge`, `Divider`, `Icon`, `SvgIcon`, `List`, `Backdrop`, `Tooltip`, `Fab`, `RadioGroup`, `Rating`, `Slider`, `Switch`, `BottomNavigation`, `Breadcrumbs`, `Link`, `Pagination`, `SpeedDial`, `Stepper`, `Accordion` and `AppBar`. `Accordion` and `AppBar` are built on `Paper`, so they take its flat, tonal treatment.
