import type React from "react";
import { MenuItem } from "@mui/material";

// Minimal MRT shapes, so `material-react-table` isn't a dependency.
// `index` is the row's position in the source data, across pages and filters.
type MrtRow<TData> = { id: string; index: number; original: TData };
type MrtReorderTable<TData> = {
  getCoreRowModel: () => { rows: MrtRow<TData>[] };
  getPrePaginationRowModel: () => { rows: MrtRow<TData>[] };
  getState: () => {
    draggingRow?: { id: string } | null;
    hoveredRow?: { id?: string } | null;
    pagination: { pageSize: number };
  };
  setPageIndex: (pageIndex: number) => void;
  options: { enablePagination?: boolean; manualPagination?: boolean };
  refs: { tableContainerRef: { current: HTMLElement | null } };
};

const ANNOUNCER = "data-ds-row-reorder-status";

// Inside the table's modal (Dialog, Drawer) if it has one: MUI keeps the rest
// of the page aria-hidden while a modal is open. Created before the first
// move, as screen readers often skip a live region inserted with its message.
const getAnnouncer = (table: MrtReorderTable<unknown>) => {
  if (typeof document === "undefined") return null;
  const host =
    table.refs.tableContainerRef.current?.closest(
      '[role="dialog"], [role="presentation"]',
    ) ?? document.body;
  let region = host.querySelector<HTMLElement>(`:scope > [${ANNOUNCER}]`);
  if (!region) {
    region = document.createElement("div");
    region.setAttribute(ANNOUNCER, "");
    region.setAttribute("role", "status");
    region.style.cssText =
      "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap";
    host.appendChild(region);
  }
  return region;
};

// Delayed: MUI marks the rest of the page aria-hidden while the row menu is
// open, and a live region changed in that window stays silent. Clearing first
// lets a repeated message be read again.
const announce = (table: MrtReorderTable<unknown>, message: string) => {
  const region = getAnnouncer(table);
  if (!region) return;
  region.textContent = "";
  setTimeout(() => {
    region.textContent = message;
  }, 250);
};

// Scoped to this table: default row ids ("0", "1", ...) repeat across tables.
const findCell = (table: MrtReorderTable<unknown>, rowId: string) =>
  Array.from(
    (table.refs.tableContainerRef.current ?? document).querySelectorAll(
      "td[data-row-id]",
    ),
  ).find((cell) => cell.getAttribute("data-row-id") === rowId);

const focusActionsButton = (
  table: MrtReorderTable<unknown>,
  rowId: string,
  tries = 10,
) => {
  const button = findCell(table, rowId)
    ?.closest("tr")
    ?.querySelector<HTMLElement>('td[data-column-id="mrt-row-actions"] button');
  if (button) button.focus();
  else if (tries > 0)
    setTimeout(() => focusActionsButton(table, rowId, tries - 1), 50);
};

// A menu move can take the row to another page. Follow it there and put
// focus back on its actions button, which MUI can't restore once the old
// one has unmounted. If the row is still on screen, MUI handles focus.
const followRow = <TData,>(table: MrtReorderTable<TData>, rowId: string) =>
  setTimeout(() => {
    const { enablePagination, manualPagination } = table.options;
    if (enablePagination === false || manualPagination) return;
    if (findCell(table, rowId)) return;
    const position = table
      .getPrePaginationRowModel()
      .rows.findIndex((r) => r.id === rowId);
    if (position < 0) return;
    table.setPageIndex(
      Math.floor(position / table.getState().pagination.pageSize),
    );
    focusActionsButton(table, rowId);
  });

// Marks the dragged row and the drop edge on the hovered row while MRT's
// native drag runs; `muiTableBodyRowProps` styles both attributes.
// Module-level: MRT rebuilds the handle props mid-drag, so the onDragEnd
// that fires isn't the one whose onDragStart set this. One drag at a time.
let stopTracking = () => {};

const trackDropEdge = (sourceRow: HTMLElement) => {
  let targetRow: HTMLElement | null = null;
  sourceRow.setAttribute("data-dragging", "");

  const stop = () => {
    document.removeEventListener("dragover", onDragOver);
    sourceRow.removeAttribute("data-dragging");
    targetRow?.removeAttribute("data-drop-edge");
  };

  const onDragOver = (e: DragEvent) => {
    // No dragend arrives if the data change removed the dragged row
    if (!sourceRow.isConnected) return stop();
    const cell = (e.target as Element | null)?.closest("td[data-row-id]");
    const tr = cell?.closest("tr");
    if (!cell || !tr) return;
    // On the document because MRT's cells set their own dragover handling
    const locked = cell.hasAttribute("data-immovable");
    if (locked && e.dataTransfer) e.dataTransfer.dropEffect = "none";
    const next = tr === sourceRow ? null : tr;
    if (next === targetRow) return;
    targetRow?.removeAttribute("data-drop-edge");
    targetRow = next;
    // Line on the edge the row will land on: below when moving down
    const isBelow =
      sourceRow.compareDocumentPosition(tr) & Node.DOCUMENT_POSITION_FOLLOWING;
    // "none" for a locked row: no line, but MRT's own dashed box is replaced
    targetRow?.setAttribute(
      "data-drop-edge",
      locked ? "none" : isBelow ? "bottom" : "top",
    );
  };
  document.addEventListener("dragover", onDragOver);

  return stop;
};

// MRT options behind `mrtOptions({ onRowReorder })`: row drag plus a
// row menu of moves as the non-drag alternative (WCAG 2.5.7).
// `isRowMovable` locks rows: no handle, no drop onto them, no menu.
export const mrtRowReorderOptions = <TData,>(
  onRowReorder: (fromIndex: number, toIndex: number) => void,
  {
    isRowMovable = () => true,
  }: { isRowMovable?: (row: TData) => boolean } = {},
) => {
  const move = (
    from: MrtRow<TData>,
    to: MrtRow<TData>,
    table: MrtReorderTable<TData>,
  ) => {
    const rows = table.getPrePaginationRowModel().rows;
    onRowReorder(from.index, to.index);
    const position = rows.findIndex((r) => r.id === to.id) + 1;
    announce(table, `Row moved to position ${position} of ${rows.length}`);
  };

  return {
    enableRowOrdering: true,
    // A sort, or a search ranking rows by relevance, would put moved rows
    // straight back
    enableSorting: false,
    enableGlobalFilterRankedResults: false,
    muiRowDragHandleProps: ({
      row,
      table,
    }: {
      row: MrtRow<TData>;
      table: MrtReorderTable<TData>;
    }) => {
      const movable = isRowMovable(row.original);
      return {
        draggable: movable,
        // Reordering by keyboard is the row menu, so the handle is no tab stop
        tabIndex: -1,
        "aria-hidden": true,
        sx: movable ? undefined : { display: "none" },
        onDragStart: (event: React.DragEvent<HTMLElement>) => {
          // Move, not copy: drops the browser's + cursor
          event.dataTransfer.effectAllowed = "move";
          getAnnouncer(table);
          stopTracking();
          const sourceRow = event.currentTarget.closest("tr");
          if (sourceRow) stopTracking = trackDropEdge(sourceRow);
        },
        onDragEnd: (event: React.DragEvent<HTMLElement>) => {
          stopTracking();
          stopTracking = () => {};
          // "none" when the drag was cancelled (Escape, or released outside)
          if (event.dataTransfer.dropEffect === "none") return;
          const { draggingRow, hoveredRow } = table.getState();
          if (!draggingRow || !hoveredRow?.id) return;
          // By id, so a data change mid-drag can't move the wrong row
          const rows = table.getCoreRowModel().rows;
          const from = rows.find((r) => r.id === draggingRow.id);
          const to = rows.find((r) => r.id === hoveredRow.id);
          if (from && to && from.id !== to.id && isRowMovable(to.original))
            move(from, to, table);
        },
      };
    },
    // Lets the drag find the hovered row. `className` is there so
    // the return type shares a prop with MUI's `TableCellProps`.
    muiTableBodyCellProps: ({
      column,
      row,
    }: {
      column: { id: string };
      row: MrtRow<TData>;
    }): {
      className?: string;
      "data-column-id": string;
      "data-row-id": string;
      "data-immovable"?: "";
    } => ({
      "data-column-id": column.id,
      "data-row-id": row.id,
      ...(isRowMovable(row.original) ? {} : { "data-immovable": "" as const }),
    }),
    enableRowActions: true,
    positionActionsColumn: "last" as const,
    renderRowActionMenuItems: ({
      closeMenu,
      row,
      table,
    }: {
      closeMenu: () => void;
      row: MrtRow<TData>;
      table: MrtReorderTable<TData>;
    }) => {
      // No items: MRT leaves out the row's actions button
      if (!isRowMovable(row.original)) return [];
      getAnnouncer(table);
      // Across pages, so the first/last row of a page can move
      const movable = table
        .getPrePaginationRowModel()
        .rows.filter((r) => isRowMovable(r.original));
      const position = movable.findIndex((r) => r.id === row.id);
      const item = (key: string, label: string, to?: MrtRow<TData>) => (
        <MenuItem
          key={key}
          disabled={!to || to.id === row.id}
          onClick={() => {
            closeMenu();
            if (!to) return;
            move(row, to, table);
            followRow(table, row.id);
          }}
        >
          {label}
        </MenuItem>
      );
      return [
        item("move-top", "Move to top", movable[0]),
        item("move-up", "Move up", movable[position - 1]),
        item("move-down", "Move down", movable[position + 1]),
        item("move-bottom", "Move to bottom", movable[movable.length - 1]),
      ];
    },
  };
};
