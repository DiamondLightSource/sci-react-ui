import * as React from "react";
import MuiBackdrop, {
  BackdropProps as MuiBackdropProps,
} from "@mui/material/Backdrop";

export type BackdropProps = MuiBackdropProps;

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (props, ref) => <MuiBackdrop ref={ref} {...props} />,
);

Backdrop.displayName = "Backdrop";
