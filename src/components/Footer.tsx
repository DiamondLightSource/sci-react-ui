import { Link, LinkProps, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dlsLogo from "../public/logo-short.svg";
import React from "react";

interface FooterLinksProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

interface FooterProps extends React.HTMLProps<HTMLDivElement> {
  /** Location/content of the logo */
  logo?: string | null;
  copyright?: string | null;
  children?: React.ReactElement | React.ReactElement[];
}

const FooterLinks = ({ children }: FooterLinksProps) => {
  return (
    <div
      style={{
        float: "left",
        alignItems: "center",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        display: "flex",
        flexWrap: "wrap",
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
    <footer
      style={{
        bottom: 0,
        marginTop: "auto",
        minHeight: 50,
        backgroundColor: theme.palette.primary.light,
      }}
      {...props}
    >
      <Grid container>
        <Grid
          size={{ xs: 6, md: 8 }}
          style={{
            alignContent: "center",
          }}
        >
          {children}
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
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
                {`Copyright © ${new Date().getFullYear()} ${copyright}`}
              </Typography>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export { Footer, FooterLinks, FooterLink };
export type { FooterLinksProps, FooterProps };
