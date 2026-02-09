import * as React from "react";
import MuiSkeleton, {
  SkeletonProps as MuiSkeletonProps,
} from "@mui/material/Skeleton";

export type SkeletonProps = MuiSkeletonProps;

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  (props, ref) => <MuiSkeleton ref={ref} {...props} />,
);

Skeleton.displayName = "Skeleton";
