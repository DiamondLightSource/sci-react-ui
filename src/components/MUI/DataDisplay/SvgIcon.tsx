import * as React from "react";
import MuiSvgIcon, {
  SvgIconProps as MuiSvgIconProps,
} from "@mui/material/SvgIcon";

export type SvgIconProps = MuiSvgIconProps;

export const SvgIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(
  (props, ref) => <MuiSvgIcon ref={ref} {...props} />,
);

SvgIcon.displayName = "SvgIcon";
