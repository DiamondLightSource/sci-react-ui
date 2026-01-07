import * as React from "react";
import MuiStepper, {
  StepperProps as MuiStepperProps,
} from "@mui/material/Stepper";

export type StepperProps = MuiStepperProps;

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => <MuiStepper ref={ref} {...props} />,
);

Stepper.displayName = "Stepper";
