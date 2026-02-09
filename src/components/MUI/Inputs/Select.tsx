import * as React from "react";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";

export type SelectProps = MuiSelectProps;

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => <MuiSelect ref={ref} {...props} />,
);

Select.displayName = "Select";
