import { Box, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ReactNode } from "react";
import { SidebarNav, type Navigation } from "./SidebarNav";
import { SecondaryNav, type SecondaryNavProps } from "./SecondaryNav";

type NavigationLayoutProps = {
  navigation: Navigation;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  /** Omit to render primary nav only (no secondary panel at all). */
  secondaryNav?: Omit<SecondaryNavProps, "open" | "setOpen" | "onBack">;

  /**
   * Desktop: whether the secondary panel is shown side-by-side.
   * Mobile: whether the view has drilled into the secondary panel.
   * One flag serves both responsive roles by design - see NavigationLayout's
   * derivation of `effectiveSidebarOpen` below.
   */
  secondaryNavOpen: boolean;
  setSecondaryNavOpen: (open: boolean) => void;

  children: ReactNode;
};

/**
 * Composes SidebarNav and SecondaryNav, owning the responsive coordination
 * between them: on mobile only one temporary drawer can be visible at a
 * time, so drilling into the secondary panel implicitly hides the primary
 * one, and its back affordance is a pure consequence of flipping
 * `secondaryNavOpen` back to false. On desktop both panels are independent.
 */
function NavigationLayout(props: NavigationLayoutProps) {
  const theme = useTheme();
  const desktopLayout = useMediaQuery(theme.breakpoints.up("sm"));

  const effectiveSidebarOpen = desktopLayout
    ? props.sidebarOpen
    : props.sidebarOpen && !props.secondaryNavOpen;

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarNav
        navigation={props.navigation}
        open={effectiveSidebarOpen}
        setOpen={props.setSidebarOpen}
      />
      {props.secondaryNav && (
        <SecondaryNav
          {...props.secondaryNav}
          open={props.secondaryNavOpen}
          setOpen={props.setSecondaryNavOpen}
          onBack={
            desktopLayout ? undefined : () => props.setSecondaryNavOpen(false)
          }
        />
      )}
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <Toolbar /> {/* spacer equal to the AppBar's height */}
        <Box sx={{ p: 3 }}>{props.children}</Box>
      </Box>
    </Box>
  );
}

export { NavigationLayout };
export type { NavigationLayoutProps };
