import * as React from "react";
import MuiTable, { TableProps as MuiTableProps } from "@mui/material/Table";

export type TableProps = MuiTableProps;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => <MuiTable ref={ref} {...props} />,
);

Table.displayName = "Table";
