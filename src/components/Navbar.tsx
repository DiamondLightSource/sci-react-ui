// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Box,
  BoxProps,
  Drawer,
  LinkProps,
  Link,
  IconButton,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { MdMenu, MdClose } from "react-icons/md";
import logoImage from "../public/logo-dark.svg"
import React, { useState } from "react";

interface NavLinksProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

interface NavbarProps extends BoxProps {
  /** Location/content of the logo */
  logo?: string | null;
  children?: React.ReactElement | React.ReactElement[];
}

const NavLink = ({ children, ...props }: LinkProps) => {
  const theme = useTheme();

  return (
    <Link
      sx={{
        "&:hover": {
          color: theme.palette.secondary.main,
          borderBottom: "solid 4px",
        },
        textDecoration: "none",
        px: 2,
        bgcolor: { md: "none" },
        alignItems: "center",
        display: "flex",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        color: theme.palette.primary.contrastText,
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

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
            sx:{backgroundColor:theme.palette.primary.main}
          }}
      >
        <Box
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {children}
        </Box>
      </Drawer>
    </>
  );
};

/**
 * Basic navigation bar. Can be used with `NavLinks` and `NavLink` to display a responsive list of links.
 */
const Navbar = ({
  children,
  logo = logoImage as string,
  ...props
}: NavbarProps) => {
  const theme = useTheme();
  
  return (
    <Box position="sticky" top="0" zIndex={1} width="100%" {...props}>
      <Paper
        sx={{
          display: "flex",
          backgroundColor:theme.palette.primary.main,
          px: { xs: "1rem", md: "7.5vw" },
          height: 50,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={8}
          sx={{ height: "100%", alignItems: "center", width: "100%" }}
        >
          {logo ? (
            <Link href="/" key="logo">
              <Box maxWidth="5rem"
                sx={{
                "&:hover": {  filter: "brightness(80%);" }
              }}>
              <img
                  alt="Home"
                  src={logo}
                  width={"100px"}
                  //style={{border:"red 1px solid"}}
                />
              </Box>
            </Link>
          ) : null}
          {children}
        </Stack>
      </Paper>
    </Box>
  );
};

export { Navbar, NavLinks, NavLink };
export type {NavLinksProps, NavbarProps };