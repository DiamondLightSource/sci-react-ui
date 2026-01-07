import * as React from "react";
import Grid2, { Grid2Props } from "@mui/material/Grid2";

export type GridV2Props = Grid2Props;

export const GridV2 = React.forwardRef<any, GridV2Props>((props, ref) => (
  <Grid2 ref={ref} {...props} />
));

GridV2.displayName = "GridV2";
