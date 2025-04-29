import {
  Box,
  BoxProps,
  Grid2 as Grid,
  Link,
  LinkProps,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import React from "react";
import {
  ImageColorSchemeSwitch,
  ImageColorSchemeSwitchType,
} from "./ImageColorSchemeSwitch";

interface FooterLinksProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

interface FooterProps extends React.HTMLProps<HTMLDivElement> {
  /** Location/content of the logo */
  logo?: ImageColorSchemeSwitchType | "theme" | null;
  copyright?: string | null;
  children?: React.ReactElement | React.ReactElement[];
}

const FooterLinks = ({ children, ...props }: FooterLinksProps) => {
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
      {...props}
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
          color: theme.vars.palette.secondary.main,
          borderBottom: "solid 4px",
        },
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
        marginLeft: "1.5rem",
        marginBottom: "4px",
        paddingBottom: "4px",
        lineHeight: 1,
        cursor: "pointer",
        borderBottom: "solid transparent 4px",
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  bottom: 0,
  marginTop: "auto",
  minHeight: 50,
  backgroundColor: theme.vars.palette.primary.light,
}));

/*
 * Basic footer bar.
 * Can be used with `FooterLinks` and `FooterLink` to display a list of links.
 */
const Footer = ({ logo, copyright, children, ...props }: FooterProps) => {
  const theme = useTheme();

  if (logo === "theme") {
    logo = theme.logos?.short;
  }

  return (
    <BoxStyled role="contentinfo" {...props}>
      <Grid container>
        <Grid
          size={logo || copyright ? { xs: 6, md: 8 } : { xs: 12, md: 12 }}
          style={{
            alignContent: "center",
          }}
        >
          <div
            style={{
              paddingTop: "10px",
              paddingLeft: "15px",
            }}
          >
            {children}
          </div>
        </Grid>

        {(logo || copyright) && (
          <Grid size={{ xs: 6, md: 4 }}>
            <div
              style={{
                float: "right",
                paddingTop: "10px",
                paddingRight: "15px",
                textAlign: "right",
              }}
            >
              {logo && <ImageColorSchemeSwitch image={logo} />}
              {copyright && (
                <Typography
                  style={{
                    margin: "0 0 10px 0",
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {`Copyright © ${new Date().getFullYear()} ${copyright}`}
                </Typography>
              )}
            </div>
          </Grid>
        )}
      </Grid>
    </BoxStyled>
  );
};

export { Footer, FooterLinks, FooterLink };
export type { FooterLinksProps, FooterProps };
