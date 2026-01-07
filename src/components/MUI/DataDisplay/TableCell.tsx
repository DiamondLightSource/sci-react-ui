import * as React from "react";
import MuiTableCell, {
  TableCellProps as MuiTableCellProps,
} from "@mui/material/TableCell";

export type TableCellProps = MuiTableCellProps;

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(props, ref) {
    return <MuiTableCell ref={ref} {...props} />;
  },
);

TableCell.displayName = "TableCell";
