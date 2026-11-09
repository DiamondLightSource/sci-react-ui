import { describe, expect, it, vi } from "vitest";
import { act, renderHook, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRowReorder } from "./useRowReorder";

describe("useRowReorder", () => {
  it("shows the drag and menu columns and turns sorting off only while reordering", async () => {
    const { result } = renderHook(() => useRowReorder({ onReorder: vi.fn() }));
    const resetSorting = vi.fn();
    const visibility = () => result.current.tableOptions.state.columnVisibility;

    expect(visibility()).toMatchObject({
      "mrt-row-drag": false,
      "mrt-row-actions": false,
    });
    expect(result.current.tableOptions.enableSorting).toBe(true);
    expect(result.current.tableOptions.enableGlobalFilterRankedResults).toBe(
      true,
    );

    const view = () =>
      render(result.current.renderToggleButton({ table: { resetSorting } }));
    view();
    await userEvent.click(screen.getByRole("button", { name: "Reorder rows" }));

    expect(visibility()).toMatchObject({
      "mrt-row-drag": true,
      "mrt-row-actions": true,
    });
    expect(result.current.tableOptions.enableSorting).toBe(false);
    expect(result.current.tableOptions.enableGlobalFilterRankedResults).toBe(
      false,
    );
    expect(resetSorting).toHaveBeenCalled();
    expect(result.current.isReordering).toBe(true);

    // Other columns' visibility is kept, but not these two
    act(() =>
      result.current.tableOptions.onColumnVisibilityChange((old) => ({
        ...old,
        scientist: false,
        "mrt-row-drag": false,
      })),
    );
    expect(visibility()).toMatchObject({
      scientist: false,
      "mrt-row-drag": true,
    });
  });
});
