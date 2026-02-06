import * as React from "react";
import MuiSnackbar, {
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material/Snackbar";

export type SnackbarProps = MuiSnackbarProps;

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (props, ref) => <MuiSnackbar ref={ref} {...props} />,
);

Snackbar.displayName = "Snackbar";
