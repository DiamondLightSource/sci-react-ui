import * as React from "react";
import MuiBottomNavigation, {
  BottomNavigationProps as MuiBottomNavigationProps,
} from "@mui/material/BottomNavigation";

export type BottomNavigationProps = MuiBottomNavigationProps;

export const BottomNavigation = React.forwardRef<
  HTMLDivElement,
  BottomNavigationProps
>((props, ref) => <MuiBottomNavigation ref={ref} {...props} />);

BottomNavigation.displayName = "BottomNavigation";
