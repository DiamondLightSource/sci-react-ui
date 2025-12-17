import * as React from "react";
import MuiBox, { BoxProps as MuiBoxProps } from "@mui/material/Box";

export type BoxProps = MuiBoxProps;

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <MuiBox ref={ref} {...props} />
));

Box.displayName = "Box";
