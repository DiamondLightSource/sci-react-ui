import * as React from "react";
import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
} from "@mui/material/Tooltip";

export type TooltipProps = MuiTooltipProps;

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => <MuiTooltip ref={ref as any} {...props} />,
);

Tooltip.displayName = "Tooltip";
