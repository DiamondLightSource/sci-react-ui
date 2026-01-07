import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export type ButtonProps = MuiButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => (
    <MuiButton ref={ref} {...rest}>
      {children}
    </MuiButton>
  ),
);

Button.displayName = "Button";
