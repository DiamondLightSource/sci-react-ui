import * as React from "react";
import MuiPagination, {
  PaginationProps as MuiPaginationProps,
} from "@mui/material/Pagination";

export type PaginationProps = MuiPaginationProps;

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => <MuiPagination ref={ref} {...props} />,
);

Pagination.displayName = "Pagination";
