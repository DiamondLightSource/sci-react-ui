// src/components/Badge/Badge.tsx
import * as React from "react";
import MuiBadge, { BadgeProps as MuiBadgeProps } from "@mui/material/Badge";

export type BadgeProps = MuiBadgeProps;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => <MuiBadge ref={ref} {...props} />,
);
Badge.displayName = "Badge";
