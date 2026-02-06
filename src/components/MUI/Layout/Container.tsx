import * as React from "react";
import MuiContainer, {
  ContainerProps as MuiContainerProps,
} from "@mui/material/Container";

export type ContainerProps = MuiContainerProps;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => <MuiContainer ref={ref} {...props} />,
);

Container.displayName = "Container";
