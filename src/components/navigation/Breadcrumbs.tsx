import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CustomLink } from "types/links";

import { Bar, BarProps } from "../controls/Bar";

interface BreadcrumbsProps extends BarProps {
  path: string | string[] | CustomLink[];
  linkComponent?: React.ElementType;
  muiBreadcrumbsProps?: MuiBreadcrumbsProps;
}

export function getCrumbs(
  path: string | string[] | CustomLink[],
): CustomLink[] {
  if (typeof path === "string") {
    path = path.split("/");
  }

  const crumbs = path.filter((item) => {
    if (typeof item === "object") {
      return Object.entries(item).length > 0 ? item : undefined;
    }
    return item.trim() !== "";
  });

  return crumbs.map((crumb, index) => {
    if (typeof crumb === "string") {
      return {
        name: crumb.charAt(0).toUpperCase() + crumb.slice(1),
        href: "/" + crumbs.slice(0, index + 1).join("/"),
      };
    }

    return {
      name: crumb.name.trim().charAt(0).toUpperCase() + crumb.name.slice(1),
      href: crumb.href.trim(),
    };
  });
}

const Breadcrumbs = ({
  path,
  linkComponent,
  muiBreadcrumbsProps,
  ...props
}: BreadcrumbsProps) => {
  const crumbs = getCrumbs(path);

  return (
    <Bar {...props}>
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        {...muiBreadcrumbsProps}
      >
        <MuiLink
          aria-label="Go to home page"
          underline="hover"
          color="inherit"
          {...(linkComponent
            ? { component: linkComponent, to: "/" }
            : { href: "/" })}
        >
          <HomeIcon aria-hidden="true" sx={{ fontSize: 20 }} />
        </MuiLink>

        {crumbs.map((crumb, i, all) => {
          if (i < all.length - 1) {
            return (
              <MuiLink
                key={`crumb-${i}`}
                underline="hover"
                color="inherit"
                {...(linkComponent
                  ? { component: linkComponent, to: crumb.href }
                  : { href: crumb.href })}
              >
                <Typography variant="body2">{crumb.name}</Typography>
              </MuiLink>
            );
          }

          return (
            <Typography key={`crumb-${i}`} variant="body2" fontWeight={600}>
              {crumb.name}
            </Typography>
          );
        })}
      </MuiBreadcrumbs>
    </Bar>
  );
};

export { Breadcrumbs };
export type { BreadcrumbsProps };
