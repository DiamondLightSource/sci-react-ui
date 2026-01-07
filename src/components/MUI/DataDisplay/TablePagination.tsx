import * as React from "react";
import MuiTablePagination, {
  TablePaginationProps as MuiTablePaginationProps,
} from "@mui/material/TablePagination";

export type TablePaginationProps = MuiTablePaginationProps;

export const TablePagination = React.forwardRef<
  HTMLDivElement,
  TablePaginationProps
>(function TablePagination(props, ref) {
  return <MuiTablePagination ref={ref} {...props} />;
});

TablePagination.displayName = "TablePagination";
