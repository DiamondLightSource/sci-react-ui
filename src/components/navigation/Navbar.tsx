// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Box,
  Drawer,
  Link,
  LinkProps,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
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
  { children, linkComponent, to, href, ...props },
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
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",

        px: 1,
        py: 1,

        borderBottom: "4px solid transparent",

        "&:hover": {
          borderBottomColor: "currentColor",
          backgroundColor: (theme) => theme.palette.action.hover,
        },

        "&.active": {
          borderBottomColor: "currentColor",
          backgroundColor: (theme) => theme.palette.action.hover,
        },

        color: (theme) =>
          theme.palette.brand?.onSolid ??
          theme.palette.primary.onSolid ??
          theme.palette.primary.contrastText,
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
        sx={(theme) => ({
          color:
            theme.palette.brand?.onSolid ??
            theme.palette.primary.onSolid ??
            theme.palette.primary.contrastText,

          display: { md: "none" },
          order: -1,
          marginLeft: "0 !important",

          "&:hover": {
            backgroundColor: "transparent",
            opacity: 0.85,
          },
        })}
        size="small"
        aria-label="Open Menu"
        onClick={isOpen ? onClose : onOpen}
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
        spacing={4}
      >
        {children}
      </Stack>

      <Drawer
        open={isOpen}
        onClose={onClose}
        anchor="left"
        PaperProps={{
          sx: (theme) => ({
            backgroundColor:
              theme.palette.brand?.solid ??
              theme.palette.primary.solid ??
              theme.palette.primary.main,

            color:
              theme.palette.brand?.onSolid ??
              theme.palette.primary.onSolid ??
              theme.palette.primary.contrastText,
          }),
        }}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            backgroundColor:
              theme.palette.brand?.solid ??
              theme.palette.primary.solid ??
              theme.palette.primary.main,
          })}
        >
          {children}
        </Box>
      </Drawer>
    </>
  );
};

const BarStyled = styled(Bar)<BarSlotsProps>(() => ({
  top: 0,
  zIndex: 1,
}));

interface NavbarProps extends BarSlotsProps {
  logo?: ImageColourSchemeSwitchType | "theme";
  linkComponent?: React.ElementType;
}

/**
 * Basic navigation bar. Brand surface by default.
 */
const Navbar = ({
  logo,
  linkComponent,
  leftSlot,
  children,
  ...props
}: NavbarProps) => {
  return (
    <BarStyled
      data-testid="navbar"
      color="primary"
      sx={(theme) => ({
        backgroundColor:
          theme.palette.brand?.solid ??
          theme.palette.primary.solid ??
          theme.palette.primary.main,

        color:
          theme.palette.brand?.onSolid ??
          theme.palette.primary.onSolid ??
          theme.palette.primary.contrastText,
      })}
      {...props}
      leftSlot={
        <>
          {logo && (
            <Link
              key="logo"
              {...(linkComponent
                ? { component: linkComponent, to: "/" }
                : { href: "/" })}
            >
              <Box
                sx={{
                  height: 32,
                  display: "flex",
                  alignItems: "center",

                  "& img": {
                    height: "100%",
                    width: "auto",
                  },

                  "&:hover": { filter: "brightness(80%)" },
                  marginRight: { xs: "0", md: "50px" },
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
