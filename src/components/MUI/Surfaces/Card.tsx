import * as React from "react";
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";

export type CardProps = MuiCardProps;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => <MuiCard ref={ref} {...props} />,
);

Card.displayName = "Card";
