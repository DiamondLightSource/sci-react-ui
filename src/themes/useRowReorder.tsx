import { useState } from "react";
import { Button } from "@mui/material";
import { mrtRowReorderOptions } from "./mrtRowReorder";

// Reorder mode for a Material React Table: the drag and row-menu columns show
// only while it is on, and sorting is off. Spread `tableOptions` after
// `DiamondDSIntegrations.mrtOptions()`, which styles the drop line.
// `tableOptions.state` holds `columnVisibility`; merge it with any `state` of your own.
export const useRowReorder = <TData,>({
  onReorder,
  isRowMovable,
  label = "Reorder rows",
}: {
  onReorder: (fromIndex: number, toIndex: number) => void;
  isRowMovable?: (row: TData) => boolean;
  label?: string;
}) => {
  const [isReordering, setIsReordering] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});

  const tableOptions = {
    ...mrtRowReorderOptions<TData>(onReorder, { isRowMovable }),
    enableSorting: !isReordering,
    enableGlobalFilterRankedResults: !isReordering,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility: {
        ...columnVisibility,
        "mrt-row-drag": isReordering,
        "mrt-row-actions": isReordering,
      },
    },
  };

  // For `renderTopToolbarCustomActions`
  const renderToggleButton = ({
    table,
  }: {
    table: { resetSorting: () => void };
  }) => (
    <Button
      size="small"
      color="secondary"
      variant={isReordering ? "contained" : "outlined"}
      aria-pressed={isReordering}
      onClick={() => {
        // A leftover sort would hide the order being edited
        if (!isReordering) table.resetSorting();
        setIsReordering((on) => !on);
      }}
    >
      {label}
    </Button>
  );

  return { isReordering, tableOptions, renderToggleButton };
};
