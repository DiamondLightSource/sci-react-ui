import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type React from "react";
import { DiamondDSIntegrations } from "./DiamondDSIntegrations";

const isLiteralColor = (value: unknown): boolean =>
  typeof value === "string" && !value.trim().startsWith("var(");

describe("DiamondDSIntegrations.mrtTheme", () => {
  it("keeps selectedRowBackgroundColor a literal colour - MRT passes it through alpha() when a row is both selected and hovered, which throws on var(...) strings", () => {
    expect(
      isLiteralColor(DiamondDSIntegrations.mrtTheme.selectedRowBackgroundColor),
    ).toBe(true);
  });
});

describe("DiamondDSIntegrations.mrtOptions", () => {
  it("applies a border and radius by default", () => {
    const options = DiamondDSIntegrations.mrtOptions();

    expect(options.muiTablePaperProps.sx.borderRadius).toBe("8px");
    expect(options.muiTableContainerProps).toBeUndefined();
  });

  it("drops the border and radius when fullWidth is set", () => {
    const options = DiamondDSIntegrations.mrtOptions({ fullWidth: true });

    expect(options.muiTablePaperProps.sx.borderRadius).toBe(0);
    expect(options.muiTableContainerProps).toEqual({
      sx: { border: "none", borderRadius: 0 },
    });
  });

  it("keeps the selection column's header background in sync with the table-level header background", () => {
    const options = DiamondDSIntegrations.mrtOptions();

    const tableLevelBg = options.muiTableHeadCellProps.sx.backgroundColor;
    const selectColumnBg =
      options.displayColumnDefOptions["mrt-row-select"].muiTableHeadCellProps.sx
        .backgroundColor;

    expect(selectColumnBg).toBe(tableLevelBg);
  });

  it("matches the plain MUI Table's hover and selected+hover tokens", () => {
    const { sx } = DiamondDSIntegrations.mrtOptions().muiTableBodyRowProps;

    expect(sx["&:hover td:after"].backgroundColor).toBe(
      "var(--ds-overlay-hover)",
    );
    expect(sx["&.Mui-selected:hover td:after"].backgroundColor).toBe(
      "rgb(var(--ds-primary-channel) / 0.12)",
    );
  });

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const makeRows = () => [
    { id: "a", index: 3, original: { locked: false } },
    { id: "b", index: 5, original: { locked: true } },
    { id: "c", index: 8, original: { locked: false } },
  ];
  const tableFor = (
    rows: ReturnType<typeof makeRows>,
    state: object = {},
    pageSize = 10,
  ) => ({
    getCoreRowModel: () => ({ rows }),
    getPrePaginationRowModel: () => ({ rows }),
    getState: () => ({ pagination: { pageSize }, ...state }),
    setPageIndex: vi.fn(),
    options: {},
    refs: { tableContainerRef: { current: null as HTMLElement | null } },
  });
  const dragEvent = (button: Element, dropEffect: string) =>
    ({
      dataTransfer: { dropEffect },
      currentTarget: button,
    }) as unknown as React.DragEvent<HTMLElement>;
  const renderRows = (rows: ReturnType<typeof makeRows>) => {
    document.body.innerHTML = `<table><tbody>${rows
      .map(
        (r) =>
          `<tr><td data-row-id="${r.id}"${r.original.locked ? " data-immovable" : ""}><button></button></td></tr>`,
      )
      .join("")}</tbody></table>`;
    return Array.from(document.querySelectorAll("tr"));
  };

  it("drags a row, showing the drop edge and reporting source-data indices", () => {
    const onRowReorder = vi.fn();
    const { muiRowDragHandleProps } = DiamondDSIntegrations.mrtOptions({
      onRowReorder,
    });
    const rows = makeRows();
    const [trA, , trC] = renderRows(rows);
    const table = tableFor(rows, { draggingRow: rows[0], hoveredRow: rows[2] });
    const button = trA.querySelector("button")!;
    const handle = () => muiRowDragHandleProps!({ row: rows[0], table });

    handle().onDragStart(dragEvent(button, "move"));
    trC.cells[0].dispatchEvent(new Event("dragover", { bubbles: true }));

    expect(trA.hasAttribute("data-dragging")).toBe(true);
    expect(trC.dataset.dropEdge).toBe("bottom");

    // MRT rebuilds the handle props mid-drag, so end on a fresh copy
    handle().onDragEnd(dragEvent(button, "move"));

    expect(onRowReorder).toHaveBeenCalledWith(3, 8);
    const status = document.querySelector("[data-ds-row-reorder-status]");
    expect(status?.textContent).toBe("");
    vi.advanceTimersByTime(250);
    expect(status?.textContent).toBe("Row moved to position 3 of 3");
    expect(trA.hasAttribute("data-dragging")).toBe(false);
    expect(trC.hasAttribute("data-drop-edge")).toBe(false);

    // A cancelled drag cleans up without moving
    onRowReorder.mockClear();
    handle().onDragStart(dragEvent(button, "move"));
    handle().onDragEnd(dragEvent(button, "none"));

    expect(onRowReorder).not.toHaveBeenCalled();
    expect(trA.hasAttribute("data-dragging")).toBe(false);
  });

  it("finds the dropped rows by id, so a data change mid-drag can't move the wrong row", () => {
    const onRowReorder = vi.fn();
    const { muiRowDragHandleProps } = DiamondDSIntegrations.mrtOptions({
      onRowReorder,
    });
    const [a, , c] = makeRows();
    const button = document.createElement("button");
    const drop = (rows: ReturnType<typeof makeRows>) =>
      muiRowDragHandleProps!({
        row: a,
        table: tableFor(rows, { draggingRow: a, hoveredRow: c }),
      }).onDragEnd(dragEvent(button, "move"));

    // The dragged row was removed
    drop([c]);
    expect(onRowReorder).not.toHaveBeenCalled();

    // The target row moved: its current index is used, not the one it had
    drop([a, { ...c, index: 1 }]);
    expect(onRowReorder).toHaveBeenCalledWith(3, 1);
  });

  it("locks rows that aren't movable", () => {
    const onRowReorder = vi.fn();
    const options = DiamondDSIntegrations.mrtOptions<{ locked: boolean }>({
      onRowReorder,
      isRowMovable: (row) => !row.locked,
    });
    const rows = makeRows();
    const [trA, trB] = renderRows(rows);
    const table = tableFor(rows);

    expect(
      options.muiRowDragHandleProps!({ row: rows[1], table }),
    ).toMatchObject({ draggable: false, sx: { display: "none" } });
    expect(
      options.muiTableBodyCellProps!({ column: { id: "x" }, row: rows[1] })[
        "data-immovable"
      ],
    ).toBe("");
    expect(
      options.renderRowActionMenuItems!({
        closeMenu: () => {},
        row: rows[1],
        table,
      }),
    ).toEqual([]);

    // Dragging over a locked row refuses the drop and draws no line or MRT box
    options.muiRowDragHandleProps!({ row: rows[0], table }).onDragStart(
      dragEvent(trA.querySelector("button")!, "move"),
    );
    const dataTransfer = { dropEffect: "move" };
    trB.cells[0].dispatchEvent(
      Object.assign(new Event("dragover", { bubbles: true }), { dataTransfer }),
    );
    expect(dataTransfer.dropEffect).toBe("none");
    expect(trB.dataset.dropEdge).toBe("none");
  });

  it("offers menu moves that skip locked rows and call onRowReorder", () => {
    const onRowReorder = vi.fn();
    const { renderRowActionMenuItems } = DiamondDSIntegrations.mrtOptions<{
      locked: boolean;
    }>({ onRowReorder, isRowMovable: (row) => !row.locked });
    // Source-data indices differ from positions; `b` is locked
    const rows = makeRows();
    const table = tableFor(rows);
    const itemsFor = (row: (typeof rows)[number]) =>
      renderRowActionMenuItems!({ closeMenu: () => {}, row, table });

    const [top, up, down, bottom] = itemsFor(rows[2]);
    expect(top.props.disabled).toBe(false);
    expect(down.props.disabled).toBe(true);
    expect(bottom.props.disabled).toBe(true);
    up.props.onClick();
    expect(onRowReorder).toHaveBeenLastCalledWith(8, 3);

    itemsFor(rows[0])[3].props.onClick();
    expect(onRowReorder).toHaveBeenLastCalledWith(3, 8);
    expect(itemsFor(rows[0])[0].props.disabled).toBe(true);
  });

  it("stops tracking when the dragged row is removed mid-drag", () => {
    const { muiRowDragHandleProps } = DiamondDSIntegrations.mrtOptions({
      onRowReorder: vi.fn(),
    });
    const rows = makeRows();
    const [trA, , trC] = renderRows(rows);
    muiRowDragHandleProps!({ row: rows[0], table: tableFor(rows) }).onDragStart(
      dragEvent(trA.querySelector("button")!, "move"),
    );

    // MRT's dragend never arrives for a removed row
    trA.remove();
    trC.cells[0].dispatchEvent(new Event("dragover", { bubbles: true }));

    expect(trC.hasAttribute("data-drop-edge")).toBe(false);

    // A new drag also ends one that never got its dragend
    const [trB] = renderRows(rows);
    const handle = (i: number) =>
      muiRowDragHandleProps!({ row: rows[i], table: tableFor(rows) });
    handle(0).onDragStart(dragEvent(trB.querySelector("button")!, "move"));
    const [, trB2] = Array.from(document.querySelectorAll("tr"));
    handle(1).onDragStart(dragEvent(trB2.querySelector("button")!, "move"));
    expect(trB.hasAttribute("data-dragging")).toBe(false);
  });

  it("follows a row moved to another page and focuses its actions button", () => {
    const { renderRowActionMenuItems } = DiamondDSIntegrations.mrtOptions({
      onRowReorder: vi.fn(),
    });
    // The consumer has applied the move: `a` now sits on page 2 (size 2)
    const [a, b, c] = makeRows();
    const table = tableFor([b, c, a], {}, 2);
    // A second table shows a row with the same id; it must not count as ours
    document.body.innerHTML = `<div id="other"><table><tr><td data-row-id="a"></td></tr></table></div><div id="mine"></div>`;
    const mine = document.getElementById("mine")!;
    table.refs.tableContainerRef.current = mine;
    // Page 2 renders once the table asks for it
    table.setPageIndex.mockImplementation(() => {
      mine.innerHTML = `<table><tr><td data-row-id="a" data-column-id="mrt-row-actions"><button></button></td></tr></table>`;
    });

    renderRowActionMenuItems!({
      closeMenu: () => {},
      row: a,
      table,
    })[0].props.onClick();
    vi.runAllTimers();

    expect(table.setPageIndex).toHaveBeenCalledWith(1);
    expect(document.activeElement).toBe(mine.querySelector("button"));
  });

  it("doesn't change pages when pagination is off or server-side", () => {
    const { renderRowActionMenuItems } = DiamondDSIntegrations.mrtOptions({
      onRowReorder: vi.fn(),
    });
    const [a, b, c] = makeRows();
    document.body.innerHTML = "";

    for (const options of [
      { enablePagination: false },
      { manualPagination: true },
    ]) {
      const table = { ...tableFor([b, c, a], {}, 2), options };
      renderRowActionMenuItems!({
        closeMenu: () => {},
        row: a,
        table,
      })[0].props.onClick();
      vi.runAllTimers();
      expect(table.setPageIndex).not.toHaveBeenCalled();
    }
  });

  it("announces inside the table's dialog, which keeps the rest of the page hidden", () => {
    const { renderRowActionMenuItems } = DiamondDSIntegrations.mrtOptions({
      onRowReorder: vi.fn(),
    });
    const rows = makeRows();
    const table = tableFor(rows);
    document.body.innerHTML = `<div role="dialog"><div id="mine"></div></div>`;
    table.refs.tableContainerRef.current = document.getElementById("mine");

    renderRowActionMenuItems!({ closeMenu: () => {}, row: rows[0], table });

    expect(
      document.querySelector('[role="dialog"] > [data-ds-row-reorder-status]'),
    ).not.toBeNull();
  });

  it("keeps the reorder columns out of the Show/Hide menu and off ranked search", () => {
    const options = DiamondDSIntegrations.mrtOptions({ onRowReorder: vi.fn() });

    expect(options.enableGlobalFilterRankedResults).toBe(false);
    for (const id of ["mrt-row-drag", "mrt-row-actions"] as const)
      expect(options.displayColumnDefOptions[id]).toEqual({
        enableHiding: false,
        visibleInShowHideMenu: false,
      });
  });
});

describe("DiamondDSIntegrations.mrtLoadingState", () => {
  it("shows skeletons without data and a progress bar with data", () => {
    const { mrtLoadingState } = DiamondDSIntegrations;

    expect(mrtLoadingState(true, undefined)).toEqual({
      showSkeletons: true,
      showProgressBars: false,
    });
    expect(mrtLoadingState(true, [])).toEqual({
      showSkeletons: true,
      showProgressBars: false,
    });
    expect(mrtLoadingState(true, [1])).toEqual({
      showSkeletons: false,
      showProgressBars: true,
    });
    expect(mrtLoadingState(false, [])).toEqual({
      showSkeletons: false,
      showProgressBars: false,
    });
  });
});

describe("DiamondDSIntegrations.skipWhileSkeleton", () => {
  it("returns no props while skeletons show", () => {
    const wrapped = DiamondDSIntegrations.skipWhileSkeleton(() => ({ a: 1 }));
    const table = (showSkeletons: boolean) => ({
      getState: () => ({ showSkeletons }),
    });

    expect(wrapped({ table: table(true) })).toEqual({});
    expect(wrapped({ table: table(false) })).toEqual({ a: 1 });
    expect(
      wrapped({ table: { getState: () => ({ isLoading: true }) } }),
    ).toEqual({});
  });
});

describe("DiamondDSIntegrations.mrtRowIntent", () => {
  it("tints rows with the intent's container token, mapping error to danger", () => {
    const { mrtRowIntent } = DiamondDSIntegrations;

    expect(mrtRowIntent("warning")["& td"].backgroundColor).toBe(
      "var(--ds-warning-container)",
    );
    expect(
      mrtRowIntent("warning")["&.Mui-selected td"].backgroundImage,
    ).toContain("--ds-primary-channel");
    const merged = {
      ...DiamondDSIntegrations.mrtOptions().muiTableBodyRowProps.sx,
      ...mrtRowIntent("warning"),
    };
    expect(merged["&:hover td:after"]).toEqual({ display: "none" });
    expect(mrtRowIntent("error")["& td"].backgroundColor).toBe(
      "var(--ds-danger-container)",
    );
  });
});
