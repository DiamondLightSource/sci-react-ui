import * as React from "react";
import MuiTableFooter, {
  TableFooterProps as MuiTableFooterProps,
} from "@mui/material/TableFooter";

export type TableFooterProps = MuiTableFooterProps;

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(function TableFooter(props, ref) {
  return <MuiTableFooter ref={ref} {...props} />;
});

TableFooter.displayName = "TableFooter";
