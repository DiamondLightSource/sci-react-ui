import * as React from "react";
import MuiTableContainer, {
  TableContainerProps as MuiTableContainerProps,
} from "@mui/material/TableContainer";

export type TableContainerProps = MuiTableContainerProps;

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  TableContainerProps
>(function TableContainer(props, ref) {
  return <MuiTableContainer ref={ref} {...props} />;
});

TableContainer.displayName = "TableContainer";
