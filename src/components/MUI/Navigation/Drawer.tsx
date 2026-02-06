import * as React from "react";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";

export type DrawerProps = MuiDrawerProps;

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (props, ref) => <MuiDrawer ref={ref} {...props} />,
);

Drawer.displayName = "Drawer";
