import * as React from "react";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";

export type ChipProps = MuiChipProps;

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => <MuiChip ref={ref} {...props} />,
);

Chip.displayName = "Chip";
