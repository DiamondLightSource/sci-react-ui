import * as React from "react";
import MuiFab, { FabProps as MuiFabProps } from "@mui/material/Fab";

export type FabProps = MuiFabProps;

export const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  (props, ref) => <MuiFab ref={ref} {...props} />,
);

Fab.displayName = "Fab";
