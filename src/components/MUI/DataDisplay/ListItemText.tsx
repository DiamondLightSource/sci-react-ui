import * as React from "react";
import MuiListItemText, {
  ListItemTextProps as MuiListItemTextProps,
} from "@mui/material/ListItemText";

export type ListItemTextProps = MuiListItemTextProps;

export const ListItemText = React.forwardRef<
  HTMLSpanElement,
  ListItemTextProps
>(function ListItemText(props, ref) {
  return <MuiListItemText ref={ref as any} {...props} />;
});

ListItemText.displayName = "ListItemText";
