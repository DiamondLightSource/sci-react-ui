import * as React from "react";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";

export type CheckboxProps = MuiCheckboxProps;

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => <MuiCheckbox ref={ref} {...props} />,
);
