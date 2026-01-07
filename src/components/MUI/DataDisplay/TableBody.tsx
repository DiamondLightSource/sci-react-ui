import * as React from "react";
import MuiTableBody, {
  TableBodyProps as MuiTableBodyProps,
} from "@mui/material/TableBody";

export type TableBodyProps = MuiTableBodyProps;

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(function TableBody(props, ref) {
  return <MuiTableBody ref={ref} {...props} />;
});

TableBody.displayName = "TableBody";
