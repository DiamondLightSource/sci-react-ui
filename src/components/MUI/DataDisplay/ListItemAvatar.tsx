import * as React from "react";
import MuiListItemAvatar, {
  ListItemAvatarProps as MuiListItemAvatarProps,
} from "@mui/material/ListItemAvatar";

export type ListItemAvatarProps = MuiListItemAvatarProps;

export const ListItemAvatar = React.forwardRef<
  HTMLDivElement,
  ListItemAvatarProps
>(function ListItemAvatar(props, ref) {
  return <MuiListItemAvatar ref={ref} {...props} />;
});

ListItemAvatar.displayName = "ListItemAvatar";
