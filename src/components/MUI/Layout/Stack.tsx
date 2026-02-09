import * as React from "react";
import MuiStack, { StackProps as MuiStackProps } from "@mui/material/Stack";

export type StackProps = MuiStackProps;

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => <MuiStack ref={ref} {...props} />,
);

Stack.displayName = "Stack";
