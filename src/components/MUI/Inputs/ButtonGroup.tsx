import * as React from "react";
import MuiButtonGroup, {
  ButtonGroupProps as MuiButtonGroupProps,
} from "@mui/material/ButtonGroup";

export type ButtonGroupProps = MuiButtonGroupProps;

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => <MuiButtonGroup ref={ref} {...props} />,
);
