import { Link, LinkProps, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dlsLogo from "../public/dls.svg";

export interface FooterLinksProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

export interface FooterProps {
  /** Location/content of the logo */
  logo?: string | null;
  copyright?: string | null;
  children?: React.ReactElement | React.ReactElement[];
}

const FooterLinks = ({ children }: FooterLinksProps) => {
  return (
    <div
      data-testid="footer-links-container"
      style={{
        float: "left",
        alignItems: "center",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
      }}
    >
      {children}
    </div>
  );
};

const FooterLink = ({ children, ...props }: LinkProps) => {
  const theme = useTheme();

  return (
    <Link
      data-testid="link-container"
      sx={{
        "&:hover": {
          color: theme.palette.secondary.main,
          borderBottom: "solid 4px",
        },
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
        marginLeft: "1.5rem",
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

/*
 * Basic footer bar.
 * Can be used with `FooterLinks` and `FooterLink` to display a list of links.
 */
const Footer = ({
  logo = dlsLogo as string,
  copyright,
  children,
  ...props
}: FooterProps) => {
  const theme = useTheme();

  return (
    <Paper
      data-testid="footer-container"
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: theme.palette.primary.light,
        minHeight: 50,
      }}
      {...props}
    >
      <Grid container>
        <Grid
          data-testid="footer-link-container"
          size={{ xs: 6, md: 8 }}
          style={{
            alignContent: "center",
          }}
        >
          {children}
        </Grid>
        <Grid data-testid="footer-logo-container" size={{ xs: 6, md: 4 }}>
          <div
            style={{
              float: "right",
              paddingTop: "10px",
              paddingRight: "15px",
              textAlign: "right",
            }}
          >
            {logo ? <img alt="footer-logo" src={logo} /> : null}
            {copyright ? (
              <Typography
                style={{
                  margin: 0,
                  color: theme.palette.primary.contrastText,
                }}
              >
                {copyright}
              </Typography>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { Footer, FooterLinks, FooterLink };
