import { Link, LinkProps, Stack, Typography, StackProps } from "@mui/material";

import React from "react";
import {
  ImageColourSchemeSwitch,
  ImageColourSchemeSwitchType,
} from "../controls/ImageColourSchemeSwitch";
import { Logo } from "../controls/Logo";
import { Bar, BarSlotsProps } from "../controls/Bar";

interface FooterLinksProps extends StackProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

const FooterLinks = ({ children, ...props }: FooterLinksProps) => (
  <Stack
    direction="row"
    alignItems="center"
    flexWrap="wrap"
    useFlexGap
    gap={2}
    {...props}
  >
    {children}
  </Stack>
);

interface FooterLinkProps extends LinkProps {
  children: React.ReactNode;
  linkComponent?: React.ElementType;
  to?: string;
  href?: string;
}

const FooterLink = ({ children, linkComponent, to, href }: FooterLinkProps) => {
  const shouldUseLinkComponent = linkComponent && to;

  const linkProps = shouldUseLinkComponent
    ? { component: linkComponent, to }
    : { href };

  return (
    <Link
      {...linkProps}
      color="inherit"
      underline="none"
      sx={{
        textDecoration: "none",
        borderBottom: "2px solid transparent",
        pb: 0.5,
        "&:hover": {
          textDecoration: "none",
          borderBottomColor: "currentColor",
        },
      }}
    >
      {children}
    </Link>
  );
};

interface FooterProps extends BarSlotsProps {
  logo?: ImageColourSchemeSwitchType | "theme";
  copyright?: string | null;
}

/*
 * Basic footer bar.
 * Can be used with `FooterLinks` and `FooterLink` to display a list of links.
 */
const Footer = ({ logo, copyright, rightSlot, ...props }: FooterProps) => {
  return (
    <Bar
      role="contentinfo"
      variant="subtle"
      {...props}
      rightSlot={
        <>
          {rightSlot}
          {(logo || copyright) && (
            <Stack alignItems="flex-end" spacing={1} sx={{ pt: 1 }}>
              {logo &&
                (logo == "theme" ? (
                  <Logo short={true} />
                ) : (
                  <ImageColourSchemeSwitch image={logo} />
                ))}
              {copyright && (
                <Typography variant="body2">
                  {`Copyright © ${new Date().getFullYear()} ${copyright}`}
                </Typography>
              )}
            </Stack>
          )}
        </>
      }
    />
  );
};

export { Footer, FooterLinks, FooterLink };
export type { FooterLinksProps, FooterProps };
