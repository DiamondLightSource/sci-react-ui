# Table guidance

Tables are used for structured data where users need to scan, compare, sort, or act on rows and columns.

> **Only show useful table behaviour.** Tables should expose the states, actions, and controls that are relevant to the task. Avoid showing interaction affordances that are not available or not connected.

## Overview

Tables are used for dense, structured information such as samples, scans, processing jobs, files, datasets, sessions, or configuration values.

In DiamondDS, tables should feel stable and predictable. Hover helps users scan rows. Selection shows an intentional state. Sorting, pagination, and row actions should be clear without making the table visually noisy.

## Use tables when

**Do**

- Use tables for structured row and column data.
- Use hover to support scanning across wide rows.
- Use selected rows only when selection has meaning.
- Use numeric alignment where comparison matters.
- Keep row density consistent within the same table.

**Don't**

- Don't use tables for simple lists or short summaries.
- Don't use selected styling just to draw attention.
- Don't rely on colour alone for status or meaning.
- Don't make hover stronger than selection.
- Don't hardcode colours in table states.

## Row content and actions

Table rows should prioritise clarity and scannability. Content should be structured so users can quickly understand values, status, and available actions without visual clutter.

### Actions

Contextual actions and "more options" should be placed at the end of the row (right side).

- Show actions on hover by default to reduce noise.
- Keep actions always visible only when they are critical or frequently used.
- Use a single "more" menu when multiple secondary actions are available.

Avoid placing actions in the middle of the table or mixing them with data values.

### Status

Use chips to represent status or state within a row.

- Use **outlined (subtle)** chips by default.
- Use stronger styles only when the status needs emphasis.
- Keep chip labels short and consistent.

Status should support the data, not dominate it. Colour should not be the only signal: combine it with clear labels.

### Layout rules

- Left: primary content and identifiers.
- Middle: supporting data.
- Right: actions and menus.

This structure helps users scan rows quickly and keeps interaction predictable across tables.

## Default table

The default table is used when users need to compare structured values. It should use system surface, border, and foreground tokens through the MUI theme.

## Row interaction states

Hover rows help users track the row they are reading or about to act on. Hover is an interaction cue, not a persistent state.

Selected rows show that a user has chosen one or more rows. Selection should be clearly visible in both light and dark mode, but calm enough for dense scientific workflows.

When hover and selection appear together, selection wins. Hover may add a small cue, but it must not hide or weaken the selected state.

See the Table "Hover selected rows" story in [Storybook](https://diamondlightsource.github.io/sci-react-ui/) for a live example.

## Row emphasis

To tint a row by intent (for example a warning), use the intent's subtle **container** colour, never the solid one, so the row stays readable and follows dark mode. Do not hardcode amber or red values. Use it sparingly, for warning or error rows only, and always pair it with a status chip or icon: a tint must never be the only signal.

```tsx
<TableRow
  sx={{
    "& td, & th": {
      backgroundColor: (theme) =>
        (theme.vars || theme).palette.warning.container,
    },
    // Cell backgrounds hide the row's hover and selected states: layer them back.
    "&.Mui-selected td, &.Mui-selected th": {
      backgroundImage:
        "linear-gradient(rgb(var(--ds-primary-channel) / 0.08), rgb(var(--ds-primary-channel) / 0.08))",
    },
    "&:hover td, &:hover th": {
      backgroundImage:
        "linear-gradient(var(--ds-overlay-hover), var(--ds-overlay-hover))",
    },
    "&.Mui-selected:hover td, &.Mui-selected:hover th": {
      backgroundImage:
        "linear-gradient(rgb(var(--ds-primary-channel) / 0.12), rgb(var(--ds-primary-channel) / 0.12))",
    },
  }}
/>
```

See the Table "Warning row" story in Storybook for a live example.

In Material React Table, use `mrtRowIntent()` instead. See [Material React Table guidance](material-react-table.md).

## Selection guidance

Use row selection when the user can perform an action on one or more rows, such as comparing scans, adding files to a queue, exporting results, or applying a batch action.

Avoid using selected rows as a visual shortcut for "important". If a row has a status, use a status column, icon, label, or supporting text alongside colour.

- Use checkboxes to indicate selectable rows.
- Selected rows must include a checked checkbox.
- Do not rely on row background alone to indicate selection.
- Include a header checkbox when bulk selection is supported.

### Selection toolbar

When one or more rows are selected, the table should switch to a selection state. This replaces the default header or toolbar area with contextual actions for the selected rows.

This change happens in the table header or toolbar area, not inside the row content. Row selection should still be shown with checkboxes and selected row styling.

- Show the number of selected rows (for example "3 selected").
- Display relevant actions for the selection (for example export, delete, queue).
- Place selection actions on the left side.
- Hide or de-emphasise non-relevant global actions.

The selection state should be clearly distinct from the default table state, but not visually disruptive.

## Sorting guidance

Sort labels should be used only where sorting is available. The active sorted column should be clear, but not visually heavier than the data itself.

## Pagination guidance

Use pagination when the data set is large enough that showing every row would reduce performance or make the page difficult to scan.

## State priority

| State    | Purpose                                      | Priority |
| -------- | -------------------------------------------- | -------- |
| Disabled | Shows that interaction is unavailable.       | Highest  |
| Error    | Shows that a row or value needs attention.   | High     |
| Selected | Shows an intentional user choice.            | High     |
| Focus    | Shows keyboard position.                     | High     |
| Hover    | Supports scanning and pointer interaction.   | Low      |

## Advanced tables (Material React Table)

Use [Material React Table](https://www.material-react-table.com/) (MRT) when the table requires advanced behaviour such as column visibility, filtering, row selection, or large data handling.

For simple and structured tables, use the base MUI table components.

### When to use MRT

- Configurable tables (show/hide columns, filtering, grouping).
- Large datasets (virtualisation or server-side data).
- Workflow-driven tables (selection, batching, export, reordering).

See [Material React Table guidance](material-react-table.md) for detailed rules and configuration.

## Token guidance

| Need                    | Prefer                                                         | Avoid                                            |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------ |
| Table surface           | `background.paper`, `surface.subtle`, semantic surface roles   | Raw hex values                                   |
| Text                    | `text.primary`, `text.secondary`                               | Opacity-only text colours                        |
| Dividers and row borders | `border.subtle`, `divider`                                    | Hardcoded grey borders                           |
| Hover state             | `action.hover`, `overlay.hover`                                | One-off hover colours                            |
| Selected rows           | `primary.container`, `overlay.selected`                        | Using subtle container colour as selected colour |
| Focus state             | `--ds-focus-ring` tokens                       | Browser default focus only                       |
| Status colours          | Semantic intents such as `success`, `warning`, `error`, `info` | Ad-hoc status colours                            |

## Accessibility

Tables must remain readable and navigable with keyboard, screen readers, and assistive technology. Use semantic table structure wherever possible: `Table`, `TableHead`, `TableBody`, `TableRow`, and `TableCell`.

If rows are selectable, make the selection control explicit. Do not rely only on row background colour to communicate selection.

## Related components

- `TableContainer`: provides the table surface and scrolling container.
- `TableHead`: groups column headings.
- `TableBody`: contains the main row data.
- `TableRow`: handles row-level states such as hover and selected.
- `TableCell`: displays header or body cell content.
- `TableSortLabel`: shows sortable column behaviour.
- `TablePagination`: controls paged data sets.
