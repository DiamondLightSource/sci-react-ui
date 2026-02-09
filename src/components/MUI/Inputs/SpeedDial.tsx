import * as React from "react";
import MuiSpeedDial, {
  SpeedDialProps as MuiSpeedDialProps,
} from "@mui/material/SpeedDial";

export type SpeedDialProps = MuiSpeedDialProps;

export const SpeedDial = React.forwardRef<HTMLDivElement, SpeedDialProps>(
  (props, ref) => <MuiSpeedDial ref={ref} {...props} />,
);

SpeedDial.displayName = "SpeedDial";
