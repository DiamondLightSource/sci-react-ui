import {
  Box, BoxProps,
  Grid2 as Grid,
  Link,
  LinkProps, Stack, styled,
  Typography,
  useTheme,
} from "@mui/material";

import React from "react";
import {
  ImageColourSchemeSwitch,
  ImageColourSchemeSwitchType,
} from "../controls/ImageColourSchemeSwitch";
import { Logo } from "../controls/Logo";
import { Bar, BarSlotsProps} from "../controls/Bar";

interface FooterLinksProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
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


const BarStyled = styled(Bar)<BarSlotsProps>(({ theme }) => ({
  position: "relative",
  bottom: 0,
  marginTop: "auto",
  backgroundColor: theme.vars.palette.primary.light,
}));

interface FooterProps extends BarSlotsProps {
  logo?: ImageColourSchemeSwitchType | "theme";
  copyright?: string | null;
}

/*
 * Basic footer bar.
 * Can be used with `FooterLinks` and `FooterLink` to display a list of links.
 */
const Footer = ({
  logo,
  copyright,
  rightSlot,
  ...props
}: FooterProps) => {
  const theme = useTheme();

  return (
    <BarStyled 
      role="contentinfo"
      containerWidth={false}
      {...props}
    
      rightSlot={<>
        {rightSlot}
        {(logo || copyright) && (
          <Stack
            direction="column" 
              style={{
                paddingTop: "10px",
                textAlign: "right",
              }}
            >
              {logo &&
                (logo == "theme" ? (
                  <Logo short={true} />
                ) : (
                  <ImageColourSchemeSwitch image={logo} />
                ))
              }
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
          </Stack>
        )}
      </>}
    />
  );
};

export { Footer, FooterLinks, FooterLink };
export type { FooterLinksProps, FooterProps };
