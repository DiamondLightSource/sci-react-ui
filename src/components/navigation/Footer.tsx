import {
  Box,
  BoxProps,
  Grid2 as Grid,
  Link,
  LinkProps,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import React, { ReactNode } from "react";
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
  centreSlot?: ReactNode;
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
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
  position: "relative",
  bottom: 0,
  marginTop: "auto",
  minHeight: "50px",
  backgroundColor: theme.vars.palette.primary.light,
  alignItems: "center",
}));

/*
 * Basic footer bar.
 * Can be used with `FooterLinks` and `FooterLink` to display a list of links.
 */
const Footer = ({
  logo,
  copyright,
  children,
  leftSlot,
  rightSlot,
  centreSlot,
  ...props
}: FooterProps) => {
  const theme = useTheme();
  let resolvedLogo: ImageColorSchemeSwitchType | null | undefined = null;

  if (logo === "theme") {
    resolvedLogo = theme.logos?.short;
  } else if (logo && typeof logo === "object") {
    resolvedLogo = logo;
  }

  return (
    <BoxStyled role="contentinfo" {...props}>
      <Grid
        container
        sx={{ position: "relative", height: "100%", minHeight: 50 }}
      >
        <Grid
          size={
            resolvedLogo || copyright ? { xs: 6, md: 8 } : { xs: 12, md: 12 }
          }
          style={{
            alignContent: "center",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            width="100%"
            sx={{
              pr: resolvedLogo || copyright ? 0 : 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {leftSlot}
              {children}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              {rightSlot}
            </Stack>
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {centreSlot}
            </Box>
          </Stack>
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
