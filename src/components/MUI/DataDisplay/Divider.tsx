import * as React from "react";
import MuiDivider, {
  DividerProps as MuiDividerProps,
} from "@mui/material/Divider";

export type DividerProps = MuiDividerProps;

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (props, ref) => <MuiDivider ref={ref} {...props} />,
);

Divider.displayName = "Divider";
