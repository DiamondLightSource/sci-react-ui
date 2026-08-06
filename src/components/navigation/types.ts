import type { ElementType } from "react";

/** Shared link-prop union for any link-bearing row across navigation components. */
export type LinkProps = ExternalLinkProps | InternalLinkProps;

/** For native anchor tags */
export type ExternalLinkProps = {
  href: string;
  component?: never;
  to?: never;
};

/** For SPA navigation, e.g. react-router-dom's Link/NavLink, injected via `component`+`to` */
export type InternalLinkProps = {
  component: ElementType;
  to: string;
  href?: never;
};
