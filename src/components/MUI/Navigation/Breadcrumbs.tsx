import * as React from "react";
import MuiBreadcrumbs, {
  BreadcrumbsProps as MuiBreadcrumbsProps,
} from "@mui/material/Breadcrumbs";

export type BreadcrumbsProps = MuiBreadcrumbsProps;

export const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(
  (props, ref) => <MuiBreadcrumbs ref={ref} {...props} />,
);

Breadcrumbs.displayName = "Breadcrumbs";
