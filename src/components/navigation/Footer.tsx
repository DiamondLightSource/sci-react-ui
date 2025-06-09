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

import React from "react";
import {
  ImageColourSchemeSwitch,
  ImageColourSchemeSwitchType,
} from "../controls/ImageColourSchemeSwitch";
import {Logo} from "../controls/Logo";

interface FooterLinksProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

interface FooterProps extends BoxProps, React.PropsWithChildren {
  logo?: ImageColourSchemeSwitchType | "theme";
  copyright?: string | null;
  centreSlot?: React.ReactElement<LinkProps>;
  rightSlot?: React.ReactElement<LinkProps>;
  leftSlot?: React.ReactElement<LinkProps>;
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

  return (
    <BoxStyled role="contentinfo" {...props}>
      <Grid
        container
        sx={{ position: "relative", height: "100%", minHeight: 50 }}
      >
        <Grid
          size={
            logo || copyright ? { xs: 6, md: 9 } : { xs: 12, md: 12 }
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
              pr: logo || copyright ? 0 : 2,
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

        {(logo || copyright) && (
          <Grid size={{ xs: 6, md: 3 }}>
            <div
              style={{
                float: "right",
                paddingTop: "10px",
                paddingRight: "15px",
                textAlign: "right",
              }}
            >
              {logo && (logo=="theme" ? <Logo short={true} /> : <ImageColourSchemeSwitch image={logo} />)}
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
