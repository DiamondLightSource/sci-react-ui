import * as React from "react";
import MuiPopper from "@mui/material/Popper";

export type PopperProps = React.ComponentProps<typeof MuiPopper>;

export const Popper = React.forwardRef<HTMLDivElement, PopperProps>(
  (props, ref) => <MuiPopper ref={ref} {...props} />,
);
