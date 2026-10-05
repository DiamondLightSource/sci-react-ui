import { describe, expect, it, vi } from "vitest";
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

  it("drags a row, showing the drop edge and reporting source-data indices", () => {
    const onRowReorder = vi.fn();
    const { muiRowDragHandleProps } = DiamondDSIntegrations.mrtOptions({
      onRowReorder,
    });
    const rows = [
      { id: "a", index: 3 },
      { id: "b", index: 5 },
      { id: "c", index: 8 },
    ];
    document.body.innerHTML = `<table><tbody>${rows
      .map((r) => `<tr><td data-row-id="${r.id}"><button></button></td></tr>`)
      .join("")}</tbody></table>`;
    const [trA, , trC] = Array.from(document.querySelectorAll("tr"));
    // MRT tracks the dragged and hovered rows itself during a native drag
    const table = {
      getRowModel: () => ({ rows }),
      getPrePaginationRowModel: () => ({ rows }),
      getState: () => ({ draggingRow: rows[0], hoveredRow: rows[2] }),
    };
    const dragEvent = (dropEffect: string) =>
      ({
        dataTransfer: { dropEffect },
        currentTarget: trA.querySelector("button")!,
      }) as unknown as React.DragEvent<HTMLElement>;

    muiRowDragHandleProps!({ table }).onDragStart(dragEvent("move"));
    trC.cells[0].dispatchEvent(new Event("dragover", { bubbles: true }));

    expect(trA.hasAttribute("data-dragging")).toBe(true);
    expect(trC.dataset.dropEdge).toBe("bottom");

    // MRT rebuilds the handle props mid-drag, so end on a fresh copy
    muiRowDragHandleProps!({ table }).onDragEnd(dragEvent("move"));

    expect(onRowReorder).toHaveBeenCalledWith(3, 8);
    expect(trA.hasAttribute("data-dragging")).toBe(false);
    expect(trC.hasAttribute("data-drop-edge")).toBe(false);

    // A cancelled drag cleans up without moving
    onRowReorder.mockClear();
    muiRowDragHandleProps!({ table }).onDragStart(dragEvent("move"));
    muiRowDragHandleProps!({ table }).onDragEnd(dragEvent("none"));

    expect(onRowReorder).not.toHaveBeenCalled();
    expect(trA.hasAttribute("data-dragging")).toBe(false);
  });

  it("offers Move up/down menu items that call onRowReorder", () => {
    const onRowReorder = vi.fn();
    const { renderRowActionMenuItems } = DiamondDSIntegrations.mrtOptions({
      onRowReorder,
    });
    // Page 2 shows `c` only; source-data indices differ from positions
    const allRows = [
      { id: "a", index: 4 },
      { id: "b", index: 7 },
      { id: "c", index: 2 },
    ];
    const table = {
      getRowModel: () => ({ rows: allRows.slice(2) }),
      getPrePaginationRowModel: () => ({ rows: allRows }),
    };
    const [up, down] = renderRowActionMenuItems!({
      closeMenu: () => {},
      row: allRows[2],
      table,
    });

    expect(down.props.disabled).toBe(true);
    up.props.onClick();
    expect(onRowReorder).toHaveBeenCalledWith(2, 7);
  });
});
