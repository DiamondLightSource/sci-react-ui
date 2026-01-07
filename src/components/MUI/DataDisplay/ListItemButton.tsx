import * as React from "react";
import MuiListItemButton, {
  ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material/ListItemButton";

export type ListItemButtonProps = MuiListItemButtonProps;

export const ListItemButton = React.forwardRef<
  HTMLDivElement,
  ListItemButtonProps
>(function ListItemButton(props, ref) {
  return <MuiListItemButton ref={ref} {...props} />;
});

ListItemButton.displayName = "ListItemButton";
