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
import { Fragment, type ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { LinkProps } from "./types";

export type Navigation = NavItemGroup[];

type NavItemGroup = {
  name?: string;
  navItems: NavItemDefinition[];
};

type NavItemDefinition = {
  label: string;
  icon: ReactNode;
  linkProps: LinkProps;
  selected?: boolean;
};

const getSidebarNavWidth = (open: boolean) => (open ? 257 : 65); // 256/64 + 1 pixel for the border

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

type NavProps = {
  navigation: Navigation;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function SidebarNav(props: NavProps) {
  const theme = useTheme();
  const desktopLayout = useMediaQuery(theme.breakpoints.up("sm"));

  if (desktopLayout) {
    return <PermanentDrawer {...props} />;
  }
  return <TemporaryDrawer {...props} />;
}

/**
 * Main layout: a permanant-variant drawer
 * which toggles between full width and slim states.
 * Pushes main content to the right.
 */
function PermanentDrawer(props: NavProps) {
  const width = getSidebarNavWidth(props.open);
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
      <NavigationItems {...props} />
    </Drawer>
  );
}

/**
 * Small-screen layout: a temporary drawer which toggles between
 * not visible and something resembling the full-width variant of the main layout.
 * Overlayed over main content.
 */
function TemporaryDrawer(props: NavProps) {
  const width = 257;
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
      <NavigationItems {...props} />
    </Drawer>
  );
}

function NavigationItems({ navigation, open }: NavProps) {
  return (
    <Box sx={{ overflow: "auto" }}>
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
                <NavItem key={itemIndex} definition={item} sidebarOpen={open} />
              );
            })}
          </Fragment>
        ))}
      </List>
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

interface NavItemProps {
  definition: NavItemDefinition;
  sidebarOpen: boolean;
}

function NavItem(props: NavItemProps) {
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
