import * as React from "react";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

export type LinkProps = MuiLinkProps;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <MuiLink ref={ref} {...props} />,
);

Link.displayName = "Link";
