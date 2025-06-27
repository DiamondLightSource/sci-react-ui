// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Box,
  BoxProps,
  Container,
  Drawer,
  Link,
  LinkProps,
  IconButton,
  Stack,
  styled,
  useTheme,
  Breakpoint,
} from "@mui/material";
import { MdMenu, MdClose } from "react-icons/md";
import React, { useState } from "react";
import {
  ImageColourSchemeSwitch,
  ImageColourSchemeSwitchType,
} from "../controls/ImageColourSchemeSwitch";

interface NavLinksProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

interface NavbarProps extends BoxProps, React.PropsWithChildren {
  logo?: ImageColourSchemeSwitchType | "theme" | null;
  linkComponent?: React.ElementType;
  centreSlot?: React.ReactElement<LinkProps>;
  rightSlot?: React.ReactElement<LinkProps>;
  leftSlot?: React.ReactElement<LinkProps>;
  containerWidth?: false | Breakpoint;
}

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

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: "100%",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 0,
  backgroundColor: theme.vars.palette.primary.main,
}));

/**
 * Basic navigation bar. Can be used with `NavLinks` and `NavLink` to display a responsive list of links.
 */
const Navbar = ({
  children,
  logo,
  linkComponent,
  leftSlot,
  rightSlot,
  centreSlot,
  containerWidth,
  ...props
}: NavbarProps) => {
  const theme = useTheme();
  let resolvedLogo: ImageColourSchemeSwitchType | null | undefined = null;
  if (logo === "theme") {
    resolvedLogo = theme.logos?.normal;
  } else if (logo && typeof logo === "object") {
    resolvedLogo = logo;
  }

  return (
    <BoxStyled role="banner" {...props}>
      <Container
        maxWidth={containerWidth}
        sx={{
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {resolvedLogo && (
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
                  <ImageColourSchemeSwitch image={resolvedLogo} />
                </Box>
              </Link>
            )}
            {leftSlot}
            {children}
          </Stack>
          {rightSlot}
        </Stack>
      </Container>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {centreSlot}
      </Box>
    </BoxStyled>
  );
};

export { Navbar, NavLinks, NavLink };
export type { NavLinksProps, NavbarProps };
