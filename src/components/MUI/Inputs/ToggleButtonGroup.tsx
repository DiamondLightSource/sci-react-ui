import * as React from "react";
import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";

export type ToggleButtonGroupProps = MuiToggleButtonGroupProps;

export const ToggleButtonGroup = React.forwardRef<
  HTMLDivElement,
  ToggleButtonGroupProps
>((props, ref) => <MuiToggleButtonGroup ref={ref} {...props} />);

ToggleButtonGroup.displayName = "ToggleButtonGroup";
