import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export type AppBarProps = MuiAppBarProps;

export const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>(
  (props, ref) => <MuiAppBar ref={ref} {...props} />,
);

AppBar.displayName = "AppBar";
