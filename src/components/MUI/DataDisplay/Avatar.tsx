import * as React from "react";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";

export type AvatarProps = MuiAvatarProps;

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, ...rest }, ref) => (
    <MuiAvatar ref={ref} {...rest}>
      {children}
    </MuiAvatar>
  ),
);

Avatar.displayName = "Avatar";
