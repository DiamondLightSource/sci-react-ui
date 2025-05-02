// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Breadcrumbs as Mui_Breadcrumbs,
  BreadcrumbsProps as Mui_BreadcrumbsProps,
  Container,
  Link as MuiLink,
  Paper,
  PaperProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CustomLink } from "types/links";

interface BreadcrumbsProps {
  path: string | string[] | CustomLink[];
  rootProps?: PaperProps;
  muiBreadcrumbsProps?: Mui_BreadcrumbsProps;
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

const Breadcrumbs = ({
  path,
  rootProps,
  muiBreadcrumbsProps,
}: BreadcrumbsProps) => {
  const theme = useTheme();
  const crumbs: CustomLink[] = getCrumbs(path);

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
          <MuiLink
            key={"crumb-0"}
            underline="hover"
            color="inherit"
            component={Link}
            to="/"
          >
            <HomeIcon sx={{ pt: 0.5, fontSize: "1.7em" }} />
          </MuiLink>

          {crumbs.map((crumb, i, all) => {
            if (i < all.length - 1)
              return (
                <MuiLink
                  key={`crumb-${i + 1}`}
                  sx={{ fontSize: "smaller" }}
                  underline="hover"
                  color="inherit"
                  component={Link}
                  to={crumb.href}
                >
                  {crumb.name}
                </MuiLink>
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
