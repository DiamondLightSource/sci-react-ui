import * as React from "react";
import MuiCssBaseline from "@mui/material/CssBaseline";

export type CssBaselineProps = React.ComponentProps<typeof MuiCssBaseline>;

export const CssBaseline = (props: CssBaselineProps) => (
  <MuiCssBaseline {...props} />
);
