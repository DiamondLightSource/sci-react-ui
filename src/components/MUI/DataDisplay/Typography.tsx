import * as React from "react";
import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from "@mui/material/Typography";

export type TypographyProps = MuiTypographyProps;

export const Typography = React.forwardRef<unknown, TypographyProps>(
  (props, ref) => <MuiTypography ref={ref} {...props} />,
);

Typography.displayName = "Typography";
