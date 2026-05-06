// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Link as MuiLink,
  styled,
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

const BarStyled = styled(Bar)<BarProps>(({ theme }) => ({
  backgroundColor: theme.vars.palette.primary.light,
}));

const MuiBreadcrumbsStyled = styled(MuiBreadcrumbs)<MuiBreadcrumbsProps>(
  ({ theme }) => ({
    color: theme.vars.palette.primary.contrastText,
    padding: 0,
  }),
);

const Breadcrumbs = ({
  path,
  linkComponent,
  muiBreadcrumbsProps,
  ...props
}: BreadcrumbsProps) => {
  const crumbs: CustomLink[] = getCrumbs(path);

  return (
    <BarStyled {...props}>
      <MuiBreadcrumbsStyled
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        {...muiBreadcrumbsProps}
      >
        <MuiLink
          aria-label="Go to home page"
          key={"crumb-0"}
          underline="hover"
          color="inherit"
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
                sx={{ fontSize: "smaller", mt: 0.1 }}
                underline="hover"
                color="inherit"
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
                key={`crumb-${i + 1}`}
                sx={{ fontWeight: "bold", mt: 0.2 }}
              >
                {crumb.name}
              </Typography>
            );
          }
        })}
      </MuiBreadcrumbsStyled>
    </BarStyled>
  );
};

export { Breadcrumbs };
export type { BreadcrumbsProps };
