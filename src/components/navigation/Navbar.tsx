// Adapted from https://github.com/DiamondLightSource/web-ui-components
import { Box, Drawer, Link, LinkProps, IconButton, Stack } from "@mui/material";
import { MdMenu, MdClose } from "react-icons/md";
import React, { forwardRef, useState } from "react";

import {
  ImageColourSchemeSwitch,
  ImageColourSchemeSwitchType,
} from "../controls/ImageColourSchemeSwitch";
import { Logo } from "../controls/Logo";
import { Bar, BarSlotsProps } from "../controls/Bar";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  linkComponent?: React.ElementType;
  to?: string;
  href?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { children, linkComponent, to, href, ...props }: NavLinkProps,
  ref,
) {
  const shouldUseLinkComponent = linkComponent && to;

  const linkProps = shouldUseLinkComponent
    ? { component: linkComponent, to }
    : { href };

  return (
    <Link
      {...linkProps}
      ref={ref}
      color="inherit"
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        px: 1,
        pt: "13px",
        pb: 0.5,
        borderBottom: "4px solid transparent",

        "&:hover, &.active": {
          borderBottomColor: "currentColor",
          backgroundColor: (theme) => theme.palette.action.hover,
        },
      }}
      {...props}
    >
      {children}
    </Link>
  );
});

interface NavLinksProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

const NavLinks = ({ children }: NavLinksProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        size="small"
        aria-label="Open Menu"
        onClick={isOpen ? onClose : onOpen}
        sx={{ display: { md: "none" }, order: -1 }}
      >
        {isOpen ? <MdClose /> : <MdMenu />}
      </IconButton>

      <Stack
        direction="row"
        sx={{
          height: "100%",
          display: { xs: "none", md: "flex" },
          marginLeft: "0 !important",
        }}
        component="nav"
        spacing={2}
      >
        {children}
      </Stack>
      <Drawer open={isOpen} onClose={onClose} anchor="left">
        <Bar surface="brand" variant="solid" sx={{ height: "100%" }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {children}
          </Box>
        </Bar>
      </Drawer>
    </>
  );
};

type NavbarProps = BarSlotsProps & {
  logo?: ImageColourSchemeSwitchType | "theme";
  linkComponent?: React.ElementType;
};

/**
 * Basic navigation bar. Can be used with `NavLinks` and `NavLink` to display a responsive list of links. Brand surface by default.
 */
const Navbar = ({
  surface = "brand",
  variant = "solid",
  elevation,
  logo,
  linkComponent,
  leftSlot,
  children,
  ...props
}: NavbarProps) => {
  return (
    <Bar
      {...props}
      surface={surface}
      variant={variant}
      elevation={elevation}
      data-testid="navbar"
      leftSlot={
        <>
          {logo && (
            <Link
              key="logo"
              {...(linkComponent
                ? { component: linkComponent, to: "/" }
                : { href: "/" })}
              color="inherit"
            >
              <Box
                sx={{
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  mb: "2px",
                  "& img": {
                    height: "100%",
                    width: "auto",
                  },
                  "&:hover": { opacity: 0.8 },
                  mr: { xs: 0, md: 5 },
                }}
              >
                {logo == "theme" ? (
                  <Logo tone="inverse" />
                ) : (
                  <ImageColourSchemeSwitch image={logo} />
                )}
              </Box>
            </Link>
          )}
          {leftSlot}
          {children}
        </>
      }
    />
  );
};

export { Navbar, NavLinks, NavLink };
export type { NavLinkProps, NavLinksProps, NavbarProps };
