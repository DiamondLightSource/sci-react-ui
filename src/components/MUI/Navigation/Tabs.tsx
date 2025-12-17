import * as React from "react";
import MuiTabs, { TabsProps as MuiTabsProps } from "@mui/material/Tabs";

export type TabsProps = MuiTabsProps;

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (props, ref) => <MuiTabs ref={ref} {...props} />,
);

Tabs.displayName = "Tabs";
