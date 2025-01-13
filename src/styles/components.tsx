import React from "react";
import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  customVariant?: string;
  [key: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({
  customVariant = "default",
  ...props
}) => {
  return <MuiButton {...props} className={customVariant} />;
};

export { Button };
