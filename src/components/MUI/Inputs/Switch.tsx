import * as React from "react";
import MuiSwitch, { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

export type SwitchProps = MuiSwitchProps;

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => <MuiSwitch ref={ref} {...props} />,
);

Switch.displayName = "Switch";
