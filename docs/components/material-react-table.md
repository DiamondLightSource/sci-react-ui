# Material React Table guidance

**Material React Table (MRT)** is an advanced table library built on top of MUI and TanStack Table. It provides higher-level functionality such as column visibility, filtering, sorting, row selection, grouping, virtualisation, and toolbar actions.

In DiamondDS, Material React Table should be used for workflow-driven or data-heavy tables where users need advanced interaction and configuration. Simpler structured tables should continue to use the base MUI table components. See [Table guidance](table.md).

MRT includes many built-in controls and behaviours by default. Teams should review and intentionally enable only the features that are useful and fully implemented for the workflow.

Learn more at [Material React Table](https://www.material-react-table.com/).

> **Only show controls that work.** Material React Table includes many built-in toolbar actions, but DiamondDS tables should expose only the actions that are useful, connected, and relevant to the current workflow.

## Styling

Material React Table is not a native MUI component, so it does not pick up **DiamondDSTheme** automatically the way MuiTable or MuiButton do. Styling has to be passed into each table explicitly through MRT's own `mrtTheme` and `muiTable*Props` options.

`DiamondDSIntegrations` provides these values ready-made: `mrtTheme` supplies MRT's internal theme colours (background, selection, hover, dragging), and `mrtOptions()` supplies the MUI slot props (header background, paper border, row hover/selected states) that give MRT the same look as the base MUI table.

```tsx
const table = useMaterialReactTable({
  columns,
  data,
  mrtTheme: DiamondDSIntegrations.mrtTheme,
  ...DiamondDSIntegrations.mrtOptions(),
});
```

> **Apply this per table.** These values are not merged into the shared theme. Every `useMaterialReactTable` call needs its own `mrtTheme` and `mrtOptions()`, or that table falls back to MRT's unstyled defaults.

## Core principle

Tables should not advertise capabilities that are not available. If a control is visible, users should be able to use it successfully.

This is especially important for scientific workflows, where users may rely on tables for scans, samples, files, jobs, or datasets. Disabled, disconnected, or misleading controls add uncertainty and slow users down.

## Toolbar rules

| Control              | Default guidance           | Show when                                                                 |
| -------------------- | -------------------------- | ------------------------------------------------------------------------- |
| Show / hide filters  | Hide by default            | Filters are configured, connected, and useful for the table.              |
| Show / hide columns  | Show when useful           | Not all columns are visible by default, or users need control over table layout. |
| Toggle density       | Hide for most use cases    | Density meaningfully supports different working modes.                    |
| Toggle full screen   | Hide for most use cases    | The table is large, complex, or central to the task.                      |
| Global search        | Show only when connected   | Search works across the expected fields and returns useful results.       |
| Export               | Show only when implemented | The export format, scope, and file naming are clear.                      |

**Do**

- Show only actions that are implemented and reliable.
- Hide toolbar buttons that are not connected to real behaviour.
- Use column visibility when users may need to reduce visual noise.
- Keep the default table view focused on the most useful columns.
- Use clear labels and tooltips for any non-obvious actions.

**Don't**

- Don't show the filter button if filtering is not hooked up.
- Don't show density controls just because MRT provides them.
- Don't show full screen unless it improves the task.
- Don't expose column hiding if every column must always remain visible.
- Don't rely on MRT defaults without reviewing the workflow.

## Recommended default

For most DiamondDS tables, start with a restrained toolbar:

```text
enableColumnFilters: false
enableDensityToggle: false
enableFullScreenToggle: false
enableHiding: true
```

Then enable additional controls only when the table needs them.

## Column visibility

Show the show / hide columns control when the table has more columns than are useful on the page, or when users may need different views for different tasks.

If all columns are already visible, readable, and required, do not show column visibility controls.

## Filtering

Filtering should only be shown when it is configured and tested. A visible filter control implies that users can filter the data in a meaningful way.

If the data source, server-side behaviour, or column filter logic is not ready, hide the filter controls until it is.

## Density

Do not show density controls by default. Most scientific tables should have a considered default density based on the task, rather than asking users to tune the interface.

Use density controls only when switching density clearly helps, such as moving between review mode and high-volume scanning mode.

## Full screen

Full screen should be reserved for complex tables where extra space materially helps the user complete the task.

Avoid full screen for small tables, supporting tables, or tables inside simple forms and dialogs.

## Manual row ordering

Manual row ordering should be treated as a focused sub-function, not as the default table mode.

Use manual ordering when users need to define a meaningful sequence that is separate from sorting, such as scan order, processing order, priority, or display order.

| Rule                                   | Guidance                                                                                                                                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Do not confuse ordering with sorting   | Sorting changes the view temporarily. Manual ordering changes the stored sequence.                                                                                                                                                   |
| Activate as a mode                     | Show manual ordering after the user selects an action such as **Reorder rows**.                                                                                                                                                      |
| Make the mode visible                  | When active, show drag handles as a dedicated first column. If row selection is present, replace the checkbox column with drag handles while reorder mode is active. Also provide a clear indication that the table is in reorder mode. |
| Save automatically by default          | Persist the new order after each completed move, unless the workflow has a specific reason to require manual saving.                                                                                                                 |
| Provide a clear exit                   | Include an **Exit reordering** or **Done** action so users can return to normal table use.                                                                                                                                           |

### Recommended behaviour

- Default table mode: no drag handles shown.
- User selects **Reorder rows**.
- Drag handles appear and row ordering becomes active.
- Each completed move is saved automatically.
- User selects **Done** to exit reorder mode.

**Do**

- Use manual ordering only where sequence has meaning.
- Make drag handles visible only in reorder mode.
- Confirm that changes are saved, for example with subtle status text.
- Disable sorting while reorder mode is active if sorting would confuse the sequence.
- Offer **Move up** / **Move down** as a non-drag alternative.

**Don't**

- Don't use drag ordering as a replacement for sorting.
- Don't show drag handles on every table by default.
- Don't leave users unsure whether the order has been saved.
- Don't allow sorting and manual reordering to fight each other.

### Implementation

Pass `onRowReorder` to `DiamondDSIntegrations.mrtOptions()`. It adds drag handles, a drop line between rows, and a row menu with **Move to top**, **Move up**, **Move down** and **Move to bottom**. Moves are announced to screen readers. Sorting and ranked search results are turned off while it is set.

`onRowReorder` receives positions in the source data, so it stays correct across pages and filters. Set `getRowId`: it keeps rows, and keyboard focus after a menu move, with the right record when the data changes. With a typed lambda, give the type: `mrtOptions<Task>(...)`. Pass `isRowMovable` to lock rows: they get no handle or menu and can't be dropped on, though they shift when rows move across them.

For a reorder mode that users switch on and off, use `useRowReorder`. The drag and menu columns show only while it is on.

```tsx
const [rows, setRows] = useState(data);

const reorder = useRowReorder<Task>({
  onReorder: (fromIndex, toIndex) =>
    setRows((prev) => {
      const next = [...prev];
      next.splice(toIndex, 0, next.splice(fromIndex, 1)[0]);
      return next;
    }),
  isRowMovable: (task) => task.status === "Queued",
});

const table = useMaterialReactTable({
  columns,
  data: rows,
  getRowId: (row) => row.id,
  renderTopToolbarCustomActions: reorder.renderToggleButton,
  mrtTheme: DiamondDSIntegrations.mrtTheme,
  ...DiamondDSIntegrations.mrtOptions(),
  ...reorder.tableOptions,
});
```

`tableOptions` sets `state.columnVisibility`, the row action menu and `muiTableBodyCellProps`. If the table has its own, combine them rather than replacing the reorder ones. A table with its own row actions should use `mrtOptions({ onRowReorder })` and merge the menu items:

```tsx
const dsOptions = DiamondDSIntegrations.mrtOptions({ onRowReorder });

const table = useMaterialReactTable({
  ...dsOptions,
  renderRowActionMenuItems: (props) => [
    ...myRowActions(props),
    ...(dsOptions.renderRowActionMenuItems?.(props) ?? []),
  ],
});
```

## Full-width tables

MRT tables normally render inside a bordered, rounded container to match the plain MUI table. When a table spans the full width of a page or panel with no surrounding container of its own, that border and radius should be dropped rather than left floating inside the layout.

Pass `fullWidth: true` to `DiamondDSIntegrations.mrtOptions()` to drop both.

```tsx
const table = useMaterialReactTable({
  columns,
  data,
  mrtTheme: DiamondDSIntegrations.mrtTheme,
  ...DiamondDSIntegrations.mrtOptions({ fullWidth: true }),
});
```

## Loading

Show one loading indicator at a time. Use skeleton rows on first load, when there is no data yet. Use a progress bar when refetching, so existing rows stay visible. Do not show both, and do not use MRT's spinner overlay.

```tsx
const table = useMaterialReactTable({
  columns,
  data,
  // Use these instead of isLoading, which adds a spinner overlay on top of the skeletons.
  state: DiamondDSIntegrations.mrtLoadingState(loading, data),
});
```

Row and checkbox style callbacks run on skeleton placeholder data. Wrap them in `DiamondDSIntegrations.skipWhileSkeleton()` so they are skipped while skeletons show.

## Row emphasis

To tint a row by intent (for example a warning), use `DiamondDSIntegrations.mrtRowIntent()`. It applies the intent's subtle container colour, never the solid one, so rows stay readable and follow dark mode. Use it sparingly, for warning or error rows only, and always pair it with a status chip or icon: a tint must never be the only signal. Spread it after `mrtOptions()` row props, so it replaces MRT's own hover and selected overlays. Wrap the callback in `skipWhileSkeleton()` so skeleton rows are not tinted.

```tsx
const mrtOptions = DiamondDSIntegrations.mrtOptions();

const table = useMaterialReactTable({
  columns,
  data,
  mrtTheme: DiamondDSIntegrations.mrtTheme,
  ...mrtOptions,
  // Spread mrtOptions' row props so hover and selected styles are kept.
  muiTableBodyRowProps: DiamondDSIntegrations.skipWhileSkeleton(({ row }) => ({
    ...mrtOptions.muiTableBodyRowProps,
    sx: {
      ...mrtOptions.muiTableBodyRowProps.sx,
      ...(row.original.status === "Paused" &&
        DiamondDSIntegrations.mrtRowIntent("warning")),
    },
  })),
});
```

## Example configuration

```tsx
const table = useMaterialReactTable({
  columns,
  data,

  enableColumnFilters: false,
  enableDensityToggle: false,
  enableFullScreenToggle: false,

  // Use only when column visibility is useful for the task.
  enableHiding: true,

  // Add custom actions only when they are implemented.
  enableRowSelection: true,

  mrtTheme: DiamondDSIntegrations.mrtTheme,
  ...DiamondDSIntegrations.mrtOptions(),
});
```
