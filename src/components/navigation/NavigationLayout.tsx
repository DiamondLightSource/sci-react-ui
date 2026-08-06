import { Box, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, type ReactNode } from "react";
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

  // Mobile: the back affordance (device/browser back, or the panel's own
  // back arrow) only has something to fall back to if `sidebarOpen` is true
  // once `secondaryNavOpen` flips false again. A consumer can open the
  // secondary panel without `sidebarOpen` being true yet - e.g. deep-linking
  // straight into it, or a tap landing mid-exit-transition of the primary
  // drawer - so drilling in self-heals that invariant rather than trusting
  // the caller to have set it.
  const setSidebarOpenRef = useRef(props.setSidebarOpen);
  setSidebarOpenRef.current = props.setSidebarOpen;

  useEffect(() => {
    if (!desktopLayout && props.secondaryNavOpen) {
      setSidebarOpenRef.current(true);
    }
  }, [desktopLayout, props.secondaryNavOpen]);

  // Mobile: drilling into the secondary panel pushes a history entry, so the
  // device/browser back action steps back to the sidebar (a popstate we
  // handle ourselves) instead of leaving the page entirely.
  const setSecondaryNavOpenRef = useRef(props.setSecondaryNavOpen);
  setSecondaryNavOpenRef.current = props.setSecondaryNavOpen;

  useEffect(() => {
    if (desktopLayout || !props.secondaryNavOpen) {
      return;
    }

    window.history.pushState({ secondaryNavOpen: true }, "");
    const onPopState = () => setSecondaryNavOpenRef.current(false);
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, [desktopLayout, props.secondaryNavOpen]);

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
