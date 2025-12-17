import * as React from "react";
import MuiLinearProgress, {
  LinearProgressProps as MuiLinearProgressProps,
} from "@mui/material/LinearProgress";

export type LinearProgressProps = MuiLinearProgressProps;

export const LinearProgress = React.forwardRef<
  HTMLDivElement,
  LinearProgressProps
>((props, ref) => <MuiLinearProgress ref={ref} {...props} />);

LinearProgress.displayName = "LinearProgress";
