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
        sx={{ display: { md: "none" }, order: -1, color: "inherit" }}
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
            onClick={onClose}
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
 * Basic navigation bar. Can be used with `NavLinks` and `NavLink` to display a responsive list of links.
 *
 * Defaults to the `brand` surface (solid), which adapts with light/dark mode like the rest of
 * the theme. Alternatives include `brand-fixed`/`brand-fixedDim` for a persistent Diamond
 * identity colour that stays constant across modes, and the neutral `surface` in `base` or
 * `container` variant. Most Diamond apps should probably reach for `brand-fixed` or
 * `surface`/`base` rather than the default — a constant Diamond identity colour, or a plain
 * neutral bar, tend to suit real product chrome better than a navbar that shifts with the mode.
 *
 * `brand-fixed`/`brand-fixedDim` (any variant) and `solid` variant on `brand`/`primary`/`secondary`
 * resolve to a fully saturated colour that provides its own separation from the page. Every other
 * combination (including `container`, and `base` on a semantic intent, which falls back to a
 * plain neutral background) picks up a bottom border so it doesn't blend into the content below.
 */
const Navbar = ({
  surface = "brand",
  variant = "solid",
  elevation,
  logo,
  linkComponent,
  leftSlot,
  children,
  sx,
  ...props
}: NavbarProps) => {
  const isFixedBrand =
    surface === "brand-fixed" || surface === "brand-fixedDim";
  const isSemanticIntent =
    surface === "brand" || surface === "primary" || surface === "secondary";
  const isSolidIntent = isSemanticIntent && variant === "solid";
  // Solid/fixed surfaces stay a dark, saturated colour in both light and dark mode, so the logo
  // needs to be forced light-on-dark rather than following the page mode.
  const isSaturatedSurface = isFixedBrand || isSolidIntent;
  const hasNeutralSurface = !isSaturatedSurface;

  return (
    <Bar
      {...props}
      surface={surface}
      variant={variant}
      elevation={elevation}
      data-testid="navbar"
      sx={[
        hasNeutralSurface && {
          borderBottom: "1px solid var(--ds-border-subtle)",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
                  ml: { xs: 2, md: 0 },
                }}
              >
                {logo == "theme" ? (
                  <>
                    <Box
                      sx={{
                        display: { xs: "flex", md: "none" },
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Logo
                        fixedTone={isSaturatedSurface ? "dark" : undefined}
                        tone="default"
                        short
                      />
                    </Box>
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Logo
                        fixedTone={isSaturatedSurface ? "dark" : undefined}
                        tone="default"
                      />
                    </Box>
                  </>
                ) : (
                  <ImageColourSchemeSwitch
                    image={logo}
                    fixedTone={isSaturatedSurface ? "dark" : undefined}
                  />
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
