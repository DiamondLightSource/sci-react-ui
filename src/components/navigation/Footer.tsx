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
} from "../controls/ImageColorSchemeSwitch";

interface FooterLinksProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

interface FooterProps extends BoxProps, React.PropsWithChildren {
  logo?: ImageColorSchemeSwitchType | "theme" | null;
  copyright?: string | null;
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

interface FooterLinkProps extends LinkProps {
  children: React.ReactNode;
  linkComponent?: React.ElementType;
  to?: string;
  href?: string;
}

const FooterLink = ({
  children,
  linkComponent,
  to,
  href,
  ...props
}: FooterLinkProps) => {
  const theme = useTheme();

  const shouldUseLinkComponent = linkComponent && to;

  const linkProps = shouldUseLinkComponent
    ? { component: linkComponent, to }
    : { href };

  return (
    <Link
      {...linkProps}
      sx={{
        "&:hover": {
          color: theme.vars.palette.secondary.main,
          borderBottom: "solid 4px",
          textDecoration: "none",
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
  minHeight: "50px",
  backgroundColor: theme.vars.palette.primary.light,
}));

/*
 * Basic footer bar.
 * Can be used with `FooterLinks` and `FooterLink` to display a list of links.
 */
const Footer = ({ logo, copyright, children, ...props }: FooterProps) => {
  const theme = useTheme();
  let resolvedLogo: ImageColorSchemeSwitchType | null | undefined = null;

  if (logo === "theme") {
    resolvedLogo = theme.logos?.short;
  } else if (logo && typeof logo === "object") {
    resolvedLogo = logo;
  }

  return (
    <BoxStyled role="contentinfo" {...props}>
      <Grid container>
        <Grid
          size={
            resolvedLogo || copyright ? { xs: 6, md: 8 } : { xs: 12, md: 12 }
          }
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

        {(resolvedLogo || copyright) && (
          <Grid size={{ xs: 6, md: 4 }}>
            <div
              style={{
                float: "right",
                paddingTop: "10px",
                paddingRight: "15px",
                textAlign: "right",
              }}
            >
              {resolvedLogo && <ImageColorSchemeSwitch image={resolvedLogo} />}
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
