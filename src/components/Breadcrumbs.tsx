// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Breadcrumbs as Mui_Breadcrumbs,
  BreadcrumbsProps as Mui_BreadcrumbsProps,
  Container,
  Link,
  Paper,
  PaperProps,
  Typography,
  useTheme,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface BreadcrumbsProps {
  path: string | string[] | object[];
  rootProps?: PaperProps;
  muiBreadcrumbsProps?: Mui_BreadcrumbsProps;
}

type CrumbData = {
  name: string;
  href: string;
};

/**
 * Create CrumbData from crumb parts with links
 * @param path A single string path, an array of string parts or and array of object parts
 */
export function getCrumbs(path: string | string[] | object[]): CrumbData[] {
  if (typeof path === "string") {
    path = path.split("/");
  }

  const crumbs = path.filter((item) => item !== "");

  return crumbs.map((crumb: any, i) => {
    if (typeof crumb === "string") {
      return {
        name: crumb.charAt(0).toUpperCase() + crumb.slice(1),
        href: "/" + crumbs.slice(0, i + 1).join("/"),
      };
    } else {
      return {
        name: crumb["name"].charAt(0).toUpperCase() + crumb["name"].slice(1),
        href: crumb["href"],
      };
    }
  });
}

const Breadcrumbs = ({
  path,
  rootProps,
  muiBreadcrumbsProps,
}: BreadcrumbsProps) => {
  const theme = useTheme();
  const crumbs: CrumbData[] = getCrumbs(path);

  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.primary.light,
        borderRadius: 0,
      }}
      {...rootProps}
    >
      <Container>
        <Mui_Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ color: theme.palette.primary.contrastText }}
          {...muiBreadcrumbsProps}
        >
          <Link key={"crumb-0"} underline="hover" color="inherit" href="/">
            <HomeIcon sx={{ pt: 0.5, fontSize: "1.7em" }} />
          </Link>

          {crumbs.map((crumb, i, all) => {
            if (i < all.length - 1)
              return (
                <Link
                  key={`crumb-${i + 1}`}
                  sx={{ fontSize: "smaller" }}
                  underline="hover"
                  color="inherit"
                  href={crumb.href}
                >
                  {crumb.name}
                </Link>
              );
            else {
              return (
                <Typography key={`crumb-${i + 1}`} sx={{ fontWeight: "bold" }}>
                  {crumb.name}
                </Typography>
              );
            }
          })}
        </Mui_Breadcrumbs>
      </Container>
    </Paper>
  );
};

export { Breadcrumbs };
export type { BreadcrumbsProps };
