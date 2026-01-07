import * as React from "react";
import MuiListItem, {
  ListItemProps as MuiListItemProps,
} from "@mui/material/ListItem";

export type ListItemProps = MuiListItemProps;

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    return <MuiListItem ref={ref} {...props} />;
  },
);
ListItem.displayName = "ListItem";
