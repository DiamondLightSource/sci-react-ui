import * as React from "react";
import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";

export type DialogProps = MuiDialogProps;

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (props, ref) => <MuiDialog ref={ref} {...props} />,
);

Dialog.displayName = "Dialog";
