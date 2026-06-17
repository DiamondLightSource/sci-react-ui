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
  type Theme,
} from "@mui/material";
import { Fragment, type ElementType, type ReactNode } from "react";

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

type LinkProps = ExternalLinkProps | InternalLinkProps;

/** For native anchor tags */
type ExternalLinkProps = {
  href: string;
  component?: never;
  to?: never;
};

/** For SPA navigation */
type InternalLinkProps = {
  component: ElementType;
  to: string;
  href?: never;
};

const drawerTransition = (theme: Theme, opening: boolean) => {
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
};

export function SidebarNav({ navigation, open }: NavProps) {
  const width = open ? 257 : 65; // 256/64 + 1 pixel for the border
  return (
    <Drawer
      variant="permanent"
      sx={(theme) => ({
        width: width,
        flexShrink: 0,
        transition: (theme) => drawerTransition(theme, open),
        [`& .MuiDrawer-paper`]: {
          width: width,
          boxSizing: "border-box",
          transition: drawerTransition(theme, open),
        },
      })}
    >
      <Toolbar /> {/* spacer equal to the AppBar's height*/}
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
                  <NavItem
                    key={itemIndex}
                    definition={item}
                    sidebarOpen={open}
                  />
                );
              })}
            </Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
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
            transition: (theme) =>
              theme.transitions.create("opacity", {
                duration: theme.transitions.duration.shorter,
              }),
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
