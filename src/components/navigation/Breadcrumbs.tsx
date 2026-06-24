// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { CustomLink } from "types/links";
import { HomeIcon, ChevronRightIcon } from "../DataDisplay/Icons";

import { Bar, BarProps } from "../controls/Bar";

type BreadcrumbsProps = BarProps & {
  path: string | string[] | CustomLink[];
  linkComponent?: React.ElementType;
  muiBreadcrumbsProps?: MuiBreadcrumbsProps;
};

/**
 * Create CrumbData from crumb parts with links
 * @param path A single string path, an array of string parts or an array of CustomLink parts
 */
export function getCrumbs(
  path: string | string[] | CustomLink[],
): CustomLink[] {
  if (typeof path === "string") {
    path = path.split("/");
  }

  const crumbs = path.filter((item) => {
    if (typeof item === "object") {
      return Object.entries(item).length > 0 ? item : undefined;
    } else {
      return item.trim() !== "";
    }
  });

  return crumbs.map((crumb: string | CustomLink, index: number) => {
    if (typeof crumb === "string") {
      return {
        name: crumb.charAt(0).toUpperCase() + crumb.slice(1),
        href: "/" + crumbs.slice(0, index + 1).join("/"),
      };
    } else {
      return {
        name:
          crumb["name"].trim().charAt(0).toUpperCase() + crumb["name"].slice(1),
        href: crumb["href"].trim(),
      };
    }
  });
}

const Breadcrumbs = ({
  surface = "surface",
  variant = "container",
  elevation,
  path,
  linkComponent,
  muiBreadcrumbsProps,
  ...props
}: BreadcrumbsProps) => {
  const crumbs: CustomLink[] = getCrumbs(path);

  return (
    <Bar {...props} surface={surface} variant={variant} elevation={elevation}>
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRightIcon fontSize="small" />}
        {...muiBreadcrumbsProps}
      >
        <MuiLink
          aria-label="Go to home page"
          key={"crumb-0"}
          underline="hover"
          {...(linkComponent
            ? {
                component: linkComponent,
                to: "/",
              }
            : {
                href: "/",
              })}
        >
          <HomeIcon
            data-testid="HomeIcon"
            aria-hidden="true"
            sx={{ pt: 0.4, fontSize: "1.5em", mt: 0.3 }}
          />
        </MuiLink>

        {crumbs.map((crumb, i, all) => {
          if (i < all.length - 1)
            return (
              <MuiLink
                key={`crumb-${i + 1}`}
                fontSize="smaller"
                underline="hover"
                {...(linkComponent
                  ? { component: linkComponent, to: crumb.href }
                  : { href: crumb.href })}
              >
                {crumb.name}
              </MuiLink>
            );
          else {
            return (
              <Typography
                key={`crumb-${i}`}
                variant="body2"
                fontWeight="medium"
              >
                {crumb.name}
              </Typography>
            );
          }
        })}
      </MuiBreadcrumbs>
    </Bar>
  );
};

export { Breadcrumbs };
export type { BreadcrumbsProps };
