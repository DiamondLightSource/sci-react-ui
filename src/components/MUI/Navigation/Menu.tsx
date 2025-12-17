import * as React from "react";
import MuiMenu, { MenuProps as MuiMenuProps } from "@mui/material/Menu";

export type MenuProps = MuiMenuProps;

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => <MuiMenu ref={ref} {...props} />,
);

Menu.displayName = "Menu";
