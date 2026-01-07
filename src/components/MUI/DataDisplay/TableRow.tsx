import * as React from "react";
import MuiTableRow, {
  TableRowProps as MuiTableRowProps,
} from "@mui/material/TableRow";

export type TableRowProps = MuiTableRowProps;

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    return <MuiTableRow ref={ref} {...props} />;
  },
);
TableRow.displayName = "TableRow";
