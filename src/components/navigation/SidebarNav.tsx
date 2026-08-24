import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { Fragment, useEffect, useRef, type ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SubNavContent, type SubNavContentProps } from "./SubNav";
import { NAV_WIDTH, type NavItem } from "./types";

export type Navigation = NavItemGroup[];

type NavItemGroup = {
  name?: string;
  navItems: NavItemDefinition[];
};

type NavItemDefinition = NavItem & {
  icon: NonNullable<NavItem["icon"]>;
  linkProps: NonNullable<NavItem["linkProps"]>;
};

const getPrimaryNavWidth = (open: boolean) =>
  (open ? NAV_WIDTH : NAV_WIDTH / 4) + 1; // +1 pixel for the border

export const drawerTransition = (theme: Theme, opening: boolean) => {
  return theme.transitions.create("width", {
    easing: opening
      ? theme.transitions.easing.easeIn
      : theme.transitions.easing.easeOut,
    duration: opening
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  });
};

type SidebarNavProps = {
  navigation: Navigation;

  open: boolean;
  setOpen: (open: boolean) => void;

  /** Rendered after the navigation items, inside the scrollable area. */
  afterNavSlot?: ReactNode;
  /** Rendered pinned to the bottom of the drawer, outside the scrollable area. */
  footerSlot?: ReactNode;

  /** Omit to render the primary nav only, with no secondary panel at all. */
  subNav?: Omit<SubNavContentProps, "onBack">;

  /**
   * Desktop: whether the secondary panel is shown side-by-side.
   * Mobile: whether the view has drilled into the secondary panel.
   * One flag serves both responsive roles by design - see the derivation of
   * `effectiveOpen` below. Required whenever `subNav` is provided.
   */
  subNavOpen?: boolean;
  setSubNavOpen?: (open: boolean) => void;
};

/**
 * Primary navigation, with an optional contextual secondary panel alongside
 * it. Without `subNav` this is just the collapsing/expanding primary
 * drawer. With it, SidebarNav also owns the responsive behaviour between the
 * two: on mobile only one temporary drawer can be visible at a time, so
 * drilling into the secondary content implicitly hides the primary sidebar,
 * and its back affordance is a pure consequence of flipping
 * `subNavOpen` back to false. On desktop both are shown side by side,
 * the secondary content in a plain panel rather than a drawer.
 */
function SidebarNav(props: SidebarNavProps) {
  const theme = useTheme();
  const desktopLayout = useMediaQuery(theme.breakpoints.up("sm"));

  const subNavOpen = props.subNavOpen ?? false;

  const effectiveOpen = desktopLayout ? props.open : props.open && !subNavOpen;

  // Mobile: the back affordance (device/browser back, or the panel's own
  // back arrow) only has something to fall back to if `open` is true once
  // `subNavOpen` flips false again. A consumer can open the secondary
  // panel without `open` set yet - e.g. deep-linking straight into it - so
  // this self-heals that invariant.
  const setOpenRef = useRef(props.setOpen);
  setOpenRef.current = props.setOpen;

  useEffect(() => {
    if (!desktopLayout && subNavOpen) {
      setOpenRef.current(true);
    }
  }, [desktopLayout, subNavOpen]);

  // Mobile: drilling into the secondary panel pushes a history entry, so the
  // device/browser back action steps back to the sidebar (a popstate we
  // handle ourselves) instead of leaving the page entirely.
  const setSubNavOpenRef = useRef(props.setSubNavOpen);
  setSubNavOpenRef.current = props.setSubNavOpen;

  useEffect(() => {
    if (desktopLayout || !subNavOpen) {
      return;
    }

    window.history.pushState({ subNavOpen: true }, "");
    const onPopState = () => setSubNavOpenRef.current?.(false);
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, [desktopLayout, subNavOpen]);

  return (
    <>
      <PrimaryNav
        navigation={props.navigation}
        open={effectiveOpen}
        setOpen={props.setOpen}
        afterNavSlot={props.afterNavSlot}
        footerSlot={props.footerSlot}
      />
      {props.subNav &&
        (desktopLayout ? (
          <SubNavPanel open={subNavOpen}>
            <SubNavContent {...props.subNav} />
          </SubNavPanel>
        ) : (
          <Drawer
            variant="temporary"
            open={subNavOpen}
            onClose={() => props.setSubNavOpen?.(false)}
            onClick={() => props.setSubNavOpen?.(false)} // close after making a selection
            sx={{
              width: NAV_WIDTH,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: NAV_WIDTH,
                boxSizing: "border-box",
                backgroundImage: "none",
                bgcolor: theme.palette.surface.elevated(1),
                borderRight: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <Toolbar />
            <SubNavContent
              {...props.subNav}
              onBack={() => props.setSubNavOpen?.(false)}
            />
          </Drawer>
        ))}
    </>
  );
}

/**
 * Desktop layout: a plain flex sibling of the primary drawer, not a Drawer -
 * MUI's Drawer paper is position:fixed, so two side-by-side Drawers would
 * render on top of each other. Transitions width between 0 and full, reusing
 * the primary drawer's width-transition mechanism.
 */
function SubNavPanel(props: { open: boolean; children: ReactNode }) {
  const theme = useTheme();
  const width = props.open ? NAV_WIDTH + 1 : 0; // +1 pixel for the border

  return (
    <Box
      sx={{
        width,
        display: "flex",
        flexDirection: "column",
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
      {/* flex:1 (not a percentage height) so this fills the panel without
          depending on an ancestor having a "definite" height to resolve
          against - percentage heights chained through a flex row were the
          likely cause of the stray scrollbar this replaced. */}
      <Box sx={{ width: NAV_WIDTH, flex: 1, minHeight: 0 }}>
        {props.children}
      </Box>
    </Box>
  );
}

type PrimaryNavProps = {
  navigation: Navigation;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Rendered after the navigation items, inside the scrollable area. */
  afterNavSlot?: ReactNode;
  /** Rendered pinned to the bottom of the drawer, outside the scrollable area. */
  footerSlot?: ReactNode;
};

/**
 * The primary drawer alone: a permanent-variant drawer on desktop which
 * toggles between full width and slim (icon-only) states, or a temporary
 * (overlaid) drawer on smaller screens.
 */
function PrimaryNav(props: PrimaryNavProps) {
  const theme = useTheme();
  const desktopLayout = useMediaQuery(theme.breakpoints.up("sm"));

  if (desktopLayout) {
    return <PermanentDrawer {...props} />;
  }
  return <TemporaryDrawer {...props} />;
}

function PermanentDrawer(props: PrimaryNavProps) {
  const width = getPrimaryNavWidth(props.open);
  return (
    <Drawer
      variant="permanent"
      sx={(theme: Theme) => ({
        width: width,
        flexShrink: 0,
        transition: (theme: Theme) => drawerTransition(theme, props.open),
        [`& .MuiDrawer-paper`]: {
          width: width,
          boxSizing: "border-box",
          transition: drawerTransition(theme, props.open),
        },
      })}
    >
      <Toolbar /> {/* spacer equal to the AppBar's height*/}
      <DrawerContent {...props} />
    </Drawer>
  );
}

function TemporaryDrawer(props: PrimaryNavProps) {
  const width = NAV_WIDTH + 1;
  return (
    <Drawer
      variant="temporary"
      open={props.open}
      onClose={() => props.setOpen(false)} // close when clicking off the drawer
      onClick={() => props.setOpen(false)} // close after making a selection
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: width,
          boxSizing: "border-box",
          backgroundImage: "none",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <Toolbar />
      <DrawerContent {...props} />
    </Drawer>
  );
}

function DrawerContent(props: PrimaryNavProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        flex: 1,
      }}
    >
      <NavigationItems {...props} />
      {props.footerSlot && (
        <Box sx={{ flexShrink: 0 }}>
          <SectionDivider />
          <Box sx={{ px: 1, pb: 1 }}>{props.footerSlot}</Box>
        </Box>
      )}
    </Box>
  );
}

function NavigationItems({ navigation, open, afterNavSlot }: PrimaryNavProps) {
  return (
    <Box sx={{ overflow: "auto", flex: 1, minHeight: 0 }}>
      <List
        sx={{
          p: 1,
          flexDirection: "column",
        }}
      >
        {navigation.map((group, groupIndex) => (
          <Fragment key={groupIndex}>
            {groupIndex > 0 && <SectionDivider />}
            {group.navItems.map((item, itemIndex) => {
              return (
                <PrimaryNavItem
                  key={itemIndex}
                  definition={item}
                  sidebarOpen={open}
                />
              );
            })}
          </Fragment>
        ))}
      </List>
      {afterNavSlot}
    </Box>
  );
}

function SectionDivider() {
  return (
    <Box sx={{ mb: 0.5 }}>
      <Divider />
    </Box>
  );
}

interface PrimaryNavItemProps {
  definition: NavItemDefinition;
  sidebarOpen: boolean;
}

function PrimaryNavItem(props: PrimaryNavItemProps) {
  const item = props.definition;
  const open = props.sidebarOpen;
  const icon = (
    <ListItemIcon
      sx={{
        minWidth: 32,
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        color: open ? "text.secondary" : "text.primary",
      }}
    >
      {item.icon}
    </ListItemIcon>
  );

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        {...item.linkProps}
        selected={props.definition.selected}
        sx={{
          p: 1,
          borderRadius: 2,
          "&.active, &.Mui-selected": {
            bgcolor: "action.selected",
            color: "primary.onContainer",
          },
          gap: 1.5,
        }}
        aria-label={item.label}
      >
        {open ? (
          icon
        ) : (
          <Tooltip title={item.label} placement="right">
            {icon}
          </Tooltip>
        )}
        <ListItemText // always render but conditionally hide
          primary={item.label}
          slotProps={{ primary: { noWrap: true } }}
          sx={{
            overflow: "hidden",
            opacity: open ? 1 : 0,
            transition: (theme: Theme) =>
              theme.transitions.create("opacity", {
                duration: theme.transitions.duration.shorter,
              }),
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export { SidebarNav };
export type { SidebarNavProps };
