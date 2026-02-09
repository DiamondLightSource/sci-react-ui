import * as React from "react";
import MuiListItemIcon, {
  ListItemIconProps as MuiListItemIconProps,
} from "@mui/material/ListItemIcon";

export type ListItemIconProps = MuiListItemIconProps;

export const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  function ListItemIcon(props, ref) {
    return <MuiListItemIcon ref={ref} {...props} />;
  },
);

ListItemIcon.displayName = "ListItemIcon";
