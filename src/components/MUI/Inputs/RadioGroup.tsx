import * as React from "react";
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";

export type RadioGroupProps = MuiRadioGroupProps;

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => <MuiRadioGroup ref={ref} {...props} />,
);

RadioGroup.displayName = "RadioGroup";
