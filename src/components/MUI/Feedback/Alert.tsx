import * as React from "react";
import MuiAlert, { AlertProps as MuiAlertProps } from "@mui/material/Alert";

export type AlertProps = MuiAlertProps;

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <MuiAlert ref={ref} {...props} />,
);

Alert.displayName = "Alert";
