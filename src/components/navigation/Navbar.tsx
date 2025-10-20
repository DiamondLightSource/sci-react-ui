// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Box,
  Drawer,
  Link,
  LinkProps,
  IconButton,
  Stack,
  useTheme,
  styled,
} from "@mui/material";
import { MdMenu, MdClose } from "react-icons/md";
import React, { useState } from "react";

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

const NavLink = ({
  children,
  linkComponent,
  to,
  href,
  ...props
}: NavLinkProps) => {
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
          color: theme.palette.secondary.main,
          borderBottom: "solid 4px",
          textDecoration: "none",
        },
        "&.active": {
          color: theme.palette.secondary.main,
        },
        textDecoration: "none",
        alignItems: "center",
        display: "flex",
        padding: "13px 3px 0",
        borderBottom: "4px solid transparent",
        backgroundColor: { md: "none" },
        color: theme.palette.primary.contrastText,
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

interface NavLinksProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

const NavLinks = ({ children }: NavLinksProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        sx={{
          color: theme.palette.primary.contrastText,
          display: { md: "none" },
          order: -1,
          marginLeft: "0 !important",
          "&:hover": { filter: "brightness(90%);" },
        }}
        size={"small"}
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
          sx: { backgroundColor: theme.vars.palette.primary.main },
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.vars.palette.primary.main,
          }}
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
 * Basic navigation bar. Can be used with `NavLinks` and `NavLink` to display a responsive list of links.
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
                maxWidth="5rem"
                sx={{
                  "&:hover": { filter: "brightness(80%);" },
                  marginRight: { xs: "0", md: "50px" },
                }}
              >
                {logo == "theme" ? (
                  <Logo interchange={true} />
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
export type { NavLinksProps, NavbarProps };
