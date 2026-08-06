import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  Fragment,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { drawerTransition } from "./SidebarNav";
import type { LinkProps } from "./types";

const SECONDARY_NAV_WIDTH = 256; // matches SidebarNav's open-state baseline width

type SecondaryNavGroup = {
  /** Rendered as an overline ListSubheader when present; omit for an ungrouped list. */
  subheader?: string;
  items: SecondaryNavItemDefinition[];
};

type SecondaryNavChildItemDefinition = {
  id: string;
  label: string;
  icon?: ReactNode;
  linkProps?: LinkProps;
  selected?: boolean;
};

type SecondaryNavItemDefinition = SecondaryNavChildItemDefinition & {
  /** One level only - children cannot themselves expand. */
  children?: SecondaryNavChildItemDefinition[];
  /** Initial Collapse state for this item; uncontrolled thereafter. */
  defaultExpanded?: boolean;
};

type SecondaryNavProps = {
  open: boolean;
  setOpen: (open: boolean) => void;

  title?: string;

  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };

  groups: SecondaryNavGroup[];

  /**
   * Renders a back affordance above the title/search when provided.
   * NavigationLayout supplies this on mobile only; omit for standalone/desktop use.
   */
  onBack?: () => void;

  /** Compact row height/spacing, suited to longer lists. Defaults to true. */
  dense?: boolean;
};

function SecondaryNav(props: SecondaryNavProps) {
  const theme = useTheme();
  const desktopLayout = useMediaQuery(theme.breakpoints.up("sm"));
  const resolvedProps = { ...props, dense: props.dense ?? true };

  if (desktopLayout) {
    return <SecondaryPanel {...resolvedProps} />;
  }
  return <TemporarySecondaryDrawer {...resolvedProps} />;
}

/**
 * Desktop layout: a plain flex sibling of whatever sits to its left (e.g.
 * SidebarNav) - not a Drawer. MUI's Drawer paper is position:fixed regardless
 * of variant, so two permanent Drawers side by side render on top of each
 * other rather than beside each other; a normal Box avoids that entirely.
 * Transitions between full width and fully hidden, reusing SidebarNav's
 * width-transition mechanism rather than a second show/hide pattern.
 */
function SecondaryPanel(props: SecondaryNavProps) {
  const width = props.open ? SECONDARY_NAV_WIDTH + 1 : 0; // +1 pixel for the border

  return (
    <Box
      sx={(theme: Theme) => ({
        width,
        minHeight: "100vh",
        flexShrink: 0,
        overflowX: "hidden",
        visibility: props.open ? "visible" : "hidden",
        transition: drawerTransition(theme, props.open),
        bgcolor: theme.palette.surface.elevated(1),
        borderRight: props.open ? "1px solid" : "none",
        borderColor: "divider",
      })}
    >
      <Toolbar /> {/* spacer equal to the AppBar's height */}
      <Box sx={{ width: SECONDARY_NAV_WIDTH, height: "100%" }}>
        <SecondaryNavContent {...props} />
      </Box>
    </Box>
  );
}

/**
 * Small-screen layout: a temporary drawer overlayed over main content, closed
 * on backdrop click or on selecting a navigable item (not on expand/collapse).
 */
function TemporarySecondaryDrawer(props: SecondaryNavProps) {
  return (
    <Drawer
      variant="temporary"
      open={props.open}
      onClose={() => props.setOpen(false)}
      onClick={() => props.setOpen(false)}
      sx={{
        width: SECONDARY_NAV_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SECONDARY_NAV_WIDTH,
          boxSizing: "border-box",
          backgroundImage: "none",
          bgcolor: (theme: Theme) => theme.palette.surface.elevated(1),
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <Toolbar />
      <SecondaryNavContent {...props} />
    </Drawer>
  );
}

function SecondaryNavContent(props: SecondaryNavProps) {
  const dense = props.dense ?? true;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <SecondaryNavHeader {...props} />
      <Box sx={{ overflow: "auto", flex: 1 }}>
        <List dense={dense} sx={{ p: 1, flexDirection: "column" }}>
          {props.groups.map((group, groupIndex) => (
            <Fragment key={groupIndex}>
              {groupIndex > 0 && <SectionDivider />}
              {group.subheader && (
                <ListSubheader
                  disableSticky
                  sx={{
                    typography: "overline",
                    color: "text.secondary",
                    bgcolor: "transparent",
                    lineHeight: 2.5,
                  }}
                >
                  {group.subheader}
                </ListSubheader>
              )}
              {group.items.map((item) => (
                <SecondaryNavItem key={item.id} item={item} dense={dense} />
              ))}
            </Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

function SecondaryNavHeader(props: SecondaryNavProps) {
  const hasHeader = props.onBack || props.title || props.search;

  if (!hasHeader) {
    return null;
  }

  return (
    <Box sx={{ px: 2, pt: 2, pb: 1 }}>
      {(props.onBack || props.title) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: props.title ? 1.5 : 0,
          }}
        >
          {props.onBack && (
            <IconButton
              onClick={props.onBack}
              aria-label="Back"
              edge="start"
              size="small"
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}
          {props.title && (
            <Typography variant="h6" component="h2" noWrap>
              {props.title}
            </Typography>
          )}
        </Box>
      )}

      {props.search && (
        <TextField
          fullWidth
          size="small"
          value={props.search.value}
          onChange={(e) => props.search!.onChange(e.target.value)}
          placeholder={props.search.placeholder ?? "Search"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
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

function getItemButtonSx(dense: boolean) {
  return {
    p: dense ? 0.5 : 1,
    borderRadius: 2,
    gap: dense ? 1 : 1.5,
    "&.active, &.Mui-selected": {
      bgcolor: "action.selected",
      color: "primary.onContainer",
    },
  };
}

function SecondaryNavItem({
  item,
  dense,
}: {
  item: SecondaryNavItemDefinition;
  dense: boolean;
}) {
  const hasChildren = !!item.children?.length;
  const isActive =
    !!item.selected || !!item.children?.some((child) => child.selected);
  const [expanded, setExpanded] = useState(item.defaultExpanded ?? isActive);
  // A selected item (or one with a selected child) should reveal its
  // children even if it wasn't expanded to begin with - e.g. the consumer
  // marks an item selected once its route becomes active.
  useEffect(() => {
    if (isActive) {
      setExpanded(true);
    }
  }, [isActive]);
  const toggle = () => setExpanded((value) => !value);
  const toggleFromEvent = (e: MouseEvent) => {
    e.stopPropagation();
    toggle();
  };
  // Toggle-only rows (no linkProps) toggle on the whole row, stopping
  // propagation so it doesn't also trigger the mobile drawer's
  // close-on-select. Rows that are also links toggle on click too, but let
  // the click keep bubbling so navigation and the drawer's close-on-select
  // still happen alongside the toggle.
  const onRowClick = hasChildren
    ? item.linkProps
      ? toggle
      : toggleFromEvent
    : undefined;

  const iconSize = dense ? 28 : 32;
  const buttonSx = getItemButtonSx(dense);

  return (
    <>
      <ListItem
        disablePadding
        sx={{ mb: dense ? 0.25 : 0.5 }}
        secondaryAction={
          hasChildren && (
            // A sibling of ListItemButton, not nested inside it - MUI's
            // ButtonBase renders a native <button>, and nesting one inside
            // another breaks click handling and is invalid HTML.
            <IconButton
              size="small"
              aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
              aria-expanded={expanded}
              onClick={toggleFromEvent}
              sx={{
                transform: expanded ? "rotate(180deg)" : "none",
                transition: (theme: Theme) =>
                  theme.transitions.create("transform"),
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          )
        }
      >
        <ListItemButton
          {...(item.linkProps ?? {})}
          onClick={onRowClick}
          selected={item.selected}
          dense={dense}
          sx={{ ...buttonSx, pr: hasChildren ? 5 : buttonSx.p }}
          aria-label={item.label}
        >
          {item.icon && (
            <ListItemIcon
              sx={{
                minWidth: iconSize,
                width: iconSize,
                height: iconSize,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            slotProps={{ primary: { variant: dense ? "body2" : "body1" } }}
          />
        </ListItemButton>
      </ListItem>
      {hasChildren && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {item.children!.map((child) => (
              <SecondaryNavChildItem
                key={child.id}
                item={child}
                dense={dense}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function SecondaryNavChildItem({
  item,
  dense,
}: {
  item: SecondaryNavChildItemDefinition;
  dense: boolean;
}) {
  const iconSize = dense ? 24 : 28;

  return (
    <ListItem disablePadding sx={{ mb: dense ? 0.25 : 0.5 }}>
      <ListItemButton
        {...(item.linkProps ?? {})}
        selected={item.selected}
        dense={dense}
        sx={getItemButtonSx(dense)}
        aria-label={item.label}
      >
        {item.icon && (
          <ListItemIcon
            sx={{
              minWidth: iconSize,
              width: iconSize,
              height: iconSize,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={item.label}
          slotProps={{ primary: { variant: "body2" } }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export { SecondaryNav };
export type {
  SecondaryNavProps,
  SecondaryNavGroup,
  SecondaryNavItemDefinition,
  SecondaryNavChildItemDefinition,
};
