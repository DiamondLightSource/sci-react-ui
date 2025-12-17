import * as React from "react";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

export type TextFieldProps = MuiTextFieldProps;

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => <MuiTextField ref={ref} {...props} />,
);

TextField.displayName = "TextField";
