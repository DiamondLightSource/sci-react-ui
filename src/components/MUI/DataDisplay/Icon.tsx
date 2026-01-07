import * as React from "react";
import MuiIcon, { IconProps as MuiIconProps } from "@mui/material/Icon";

export type IconProps = MuiIconProps;

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (props, ref) => <MuiIcon ref={ref} {...props} />,
);

Icon.displayName = "Icon";
