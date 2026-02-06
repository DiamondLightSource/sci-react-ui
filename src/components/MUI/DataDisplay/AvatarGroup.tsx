import * as React from "react";
import MuiAvatarGroup, {
  AvatarGroupProps as MuiAvatarGroupProps,
} from "@mui/material/AvatarGroup";

export type AvatarGroupProps = MuiAvatarGroupProps;

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, ...rest }, ref) => (
    <MuiAvatarGroup ref={ref} {...rest}>
      {children}
    </MuiAvatarGroup>
  ),
);

AvatarGroup.displayName = "AvatarGroup";
