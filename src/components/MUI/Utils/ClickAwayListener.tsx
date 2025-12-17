import * as React from "react";
import MuiClickAwayListener from "@mui/material/ClickAwayListener";

export type ClickAwayListenerProps = React.ComponentProps<
  typeof MuiClickAwayListener
>;

export const ClickAwayListener = (props: ClickAwayListenerProps) => (
  <MuiClickAwayListener {...props} />
);

ClickAwayListener.displayName = "ClickAwayListener";
