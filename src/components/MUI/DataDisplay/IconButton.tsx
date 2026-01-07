import * as React from "react";
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

export type IconButtonProps = MuiIconButtonProps;

export const IconButton = React.forwardRef<SVGSVGElement, IconButtonProps>(
  (props, ref) => <MuiIconButton ref={ref} {...props} />,
);

IconButton.displayName = "IconButton";
