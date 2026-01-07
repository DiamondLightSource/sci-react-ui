import * as React from "react";
import MuiTableSortLabel, {
  TableSortLabelProps as MuiTableSortLabelProps,
} from "@mui/material/TableSortLabel";

export type TableSortLabelProps = MuiTableSortLabelProps;

export const TableSortLabel = React.forwardRef<
  HTMLSpanElement,
  TableSortLabelProps
>(function TableSortLabel(props, ref) {
  return <MuiTableSortLabel ref={ref} {...props} />;
});

TableSortLabel.displayName = "TableSortLabel";
