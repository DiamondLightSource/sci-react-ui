import { Box, Drawer, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, type ReactNode } from "react";
import { SidebarNav, drawerTransition, type Navigation } from "./SidebarNav";
import {
  SecondaryNavContent,
  type SecondaryNavContentProps,
} from "./SecondaryNav";

const SECONDARY_NAV_WIDTH = 256; // matches SidebarNav's open-state baseline width

type NavigationLayoutProps = {
  navigation: Navigation;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  /** Omit to render primary nav only (no secondary panel at all). */
  secondaryNav?: Omit<SecondaryNavContentProps, "onBack">;

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
 * Composes SidebarNav with SecondaryNavContent, owning all of the responsive
 * behaviour between them: on mobile only one temporary drawer can be visible
 * at a time, so drilling into the secondary content implicitly hides the
 * primary sidebar, and its back affordance is a pure consequence of flipping
 * `secondaryNavOpen` back to false. On desktop both are shown side by side,
 * the secondary content in a plain panel rather than a drawer.
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
  // secondary panel without `sidebarOpen` set yet - e.g. deep-linking
  // straight into it - so this self-heals that invariant.
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
      {props.secondaryNav &&
        (desktopLayout ? (
          <SecondaryNavPanel open={props.secondaryNavOpen}>
            <SecondaryNavContent {...props.secondaryNav} />
          </SecondaryNavPanel>
        ) : (
          <Drawer
            variant="temporary"
            open={props.secondaryNavOpen}
            onClose={() => props.setSecondaryNavOpen(false)}
            onClick={() => props.setSecondaryNavOpen(false)} // close after making a selection
            sx={{
              width: SECONDARY_NAV_WIDTH,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: SECONDARY_NAV_WIDTH,
                boxSizing: "border-box",
                backgroundImage: "none",
                bgcolor: theme.palette.surface.elevated(1),
                borderRight: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <Toolbar />
            <SecondaryNavContent
              {...props.secondaryNav}
              onBack={() => props.setSecondaryNavOpen(false)}
            />
          </Drawer>
        ))}
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <Toolbar /> {/* spacer equal to the AppBar's height */}
        <Box sx={{ p: 3 }}>{props.children}</Box>
      </Box>
    </Box>
  );
}

/**
 * Desktop layout: a plain flex sibling of SidebarNav, not a Drawer - MUI's
 * Drawer paper is position:fixed, so two side-by-side Drawers would render
 * on top of each other. Transitions width between 0 and full, reusing
 * SidebarNav's width-transition mechanism.
 */
function SecondaryNavPanel(props: { open: boolean; children: ReactNode }) {
  const theme = useTheme();
  const width = props.open ? SECONDARY_NAV_WIDTH + 1 : 0; // +1 pixel for the border

  return (
    <Box
      sx={{
        width,
        minHeight: "100vh",
        flexShrink: 0,
        overflowX: "hidden",
        visibility: props.open ? "visible" : "hidden",
        transition: drawerTransition(theme, props.open),
        bgcolor: theme.palette.surface.elevated(1),
        borderRight: props.open ? "1px solid" : "none",
        borderColor: "divider",
      }}
    >
      <Toolbar /> {/* spacer equal to the AppBar's height */}
      <Box sx={{ width: SECONDARY_NAV_WIDTH, height: "100%" }}>
        {props.children}
      </Box>
    </Box>
  );
}

export { NavigationLayout };
export type { NavigationLayoutProps };
