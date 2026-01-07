import * as React from "react";
import MuiCircularProgress, {
  CircularProgressProps as MuiCircularProgressProps,
} from "@mui/material/CircularProgress";

export type CircularProgressProps = MuiCircularProgressProps;

export const CircularProgress = React.forwardRef<
  HTMLSpanElement,
  CircularProgressProps
>((props, ref) => <MuiCircularProgress ref={ref} {...props} />);

CircularProgress.displayName = "CircularProgress";
