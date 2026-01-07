import Grid2, { Grid2Props } from "@mui/material/Grid2/Grid2";
import React from "react";

export type GridV2Props = Grid2Props;

export const GridV2 = React.forwardRef<HTMLDivElement, Grid2Props>(
  (props, ref) => <Grid2 ref={ref} {...props} />,
);

GridV2.displayName = "GridV2";
