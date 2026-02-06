import * as React from "react";
import MuiListSubheader, {
  ListSubheaderProps as MuiListSubheaderProps,
} from "@mui/material/ListSubheader";

export type ListSubheaderProps = MuiListSubheaderProps;

export const ListSubheader = React.forwardRef<
  HTMLLIElement,
  ListSubheaderProps
>(function ListSubheader(props, ref) {
  return <MuiListSubheader ref={ref} {...props} />;
});
ListSubheader.displayName = "ListSubheader";
