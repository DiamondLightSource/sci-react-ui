import * as React from "react";
import MuiPopover, {
  PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";

export type PopoverProps = MuiPopoverProps;

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (props, ref) => <MuiPopover ref={ref} {...props} />,
);

Popover.displayName = "Popover";
