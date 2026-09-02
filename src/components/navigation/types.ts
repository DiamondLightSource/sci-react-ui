import type { ElementType, ReactNode } from "react";

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

/** Baseline open-state width (px) shared by the primary and secondary nav panels; add 1 where a consumer also draws a border. */
export const NAV_WIDTH = 256;

/** A single navigable row, shared by SidebarNav and SubNav. */
export type NavItem = {
  label: string;
  icon?: ReactNode;
  linkProps?: LinkProps;
  selected?: boolean;
};

/** A NavItem that may itself expand to reveal one level of child NavItems. */
export type NavItemWithChildren = NavItem & {
  /** One level only - children cannot themselves expand. */
  children?: NavItem[];
  /** Initial Collapse state for this item; uncontrolled thereafter. */
  defaultExpanded?: boolean;
};
