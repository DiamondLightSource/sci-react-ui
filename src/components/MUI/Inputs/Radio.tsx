import * as React from "react";
import MuiRadio, { RadioProps as MuiRadioProps } from "@mui/material/Radio";

export type RadioProps = MuiRadioProps;

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  (props, ref) => <MuiRadio ref={ref} {...props} />,
);
