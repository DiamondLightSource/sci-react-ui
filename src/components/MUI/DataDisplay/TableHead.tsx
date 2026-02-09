import * as React from "react";
import MuiTableHead, {
  TableHeadProps as MuiTableHeadProps,
} from "@mui/material/TableHead";

export type TableHeadProps = MuiTableHeadProps;

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  TableHeadProps
>(function TableHead(props, ref) {
  return <MuiTableHead ref={ref} {...props} />;
});

TableHead.displayName = "TableHead";
