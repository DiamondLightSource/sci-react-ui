import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Fragment, useState, type MouseEvent, type ReactNode } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import type { NavItem, NavItemWithChildren } from "./types";

type SubNavGroup = {
  /** Rendered as an overline ListSubheader when present; omit for an ungrouped list. */
  subheader?: string;
  items: NavItemWithChildren[];
};

type SubNavContentProps = {
  title?: string;

  groups: SubNavGroup[];

  /** Rendered before the item list, inside the scrollable area - typically a search field. */
  beforeNavSlot?: ReactNode;
  /** Rendered after the item list, inside the scrollable area. */
  afterNavSlot?: ReactNode;
  /** Rendered pinned to the bottom of the panel, outside the scrollable area. */
  footerSlot?: ReactNode;

  /**
   * Renders a back affordance above the title when provided.
   * SidebarNav supplies this on mobile only; omit for standalone use.
   */
  onBack?: () => void;

  /**
   * Rendered at the end of the header row, beside the title - typically an
   * icon button that collapses the panel.
   */
  titleEndSlot?: ReactNode;

  /** Compact row height/spacing, suited to longer lists. Defaults to true. */
  dense?: boolean;
};

/**
 * Just the contextual nav's content - a header (title/back) plus a grouped,
 * optionally-expandable list. Presentation (Drawer vs. side-by-side panel,
 * responsive switching) is SidebarNav's job, not this component's.
 */
function SubNavContent(props: SubNavContentProps) {
  const dense = props.dense ?? true;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <SubNavHeader {...props} />
      <Box sx={{ overflow: "auto", flex: 1, minHeight: 0 }}>
        {props.beforeNavSlot}
        <List dense={dense} sx={{ p: 1, flexDirection: "column" }}>
          {props.groups.map((group, groupIndex) => (
            <Fragment key={groupIndex}>
              {groupIndex > 0 && <SectionDivider spaced />}
              {group.subheader && (
                <ListSubheader
                  disableSticky
                  sx={{
                    typography: "overline",
                    color: "text.secondary",
                    bgcolor: "transparent",
                    lineHeight: 2.5,
                    pl: 5,
                  }}
                >
                  {group.subheader}
                </ListSubheader>
              )}
              {group.items.map((item, itemIndex) => (
                <SubNavItem key={itemIndex} item={item} dense={dense} />
              ))}
            </Fragment>
          ))}
        </List>
        {props.afterNavSlot}
      </Box>
      {props.footerSlot && (
        <Box sx={{ flexShrink: 0 }}>
          <SectionDivider />
          <Box sx={{ pb: 1 }}>{props.footerSlot}</Box>
        </Box>
      )}
    </Box>
  );
}

function SubNavHeader(props: SubNavContentProps) {
  if (!props.onBack && !props.title && !props.titleEndSlot) {
    return null;
  }

  return (
    <Box sx={{ px: 2, pt: 2, pb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {props.onBack && (
          <IconButton
            onClick={props.onBack}
            aria-label="Back"
            edge="start"
            size="small"
          >
            <ArrowLeft size={20} strokeWidth={1.75} aria-hidden />
          </IconButton>
        )}
        {props.title && (
          <Typography variant="h6" component="h2" noWrap>
            {props.title}
          </Typography>
        )}
        {props.titleEndSlot && (
          <Box sx={{ ml: "auto", display: "flex", flexShrink: 0 }}>
            {props.titleEndSlot}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function SectionDivider({ spaced }: { spaced?: boolean }) {
  return (
    <Box sx={{ mt: spaced ? 1.5 : 0, mb: 0.5 }}>
      <Divider />
    </Box>
  );
}

function getItemButtonSx(dense: boolean) {
  return {
    px: 1,
    py: dense ? 0.5 : 1,
    borderRadius: 2,
    gap: dense ? 1 : 1.5,
    "&.active, &.Mui-selected": {
      bgcolor: "action.selected",
      color: "primary.onContainer",
    },
  };
}

function SubNavItem({
  item,
  dense,
}: {
  item: NavItemWithChildren;
  dense: boolean;
}) {
  const hasChildren = !!item.children?.length;
  const isActive =
    !!item.selected || !!item.children?.some((child) => child.selected);
  const [expanded, setExpanded] = useState(!!item.defaultExpanded || isActive);
  // An item that becomes selected (or gains a selected child) should reveal
  // its children even if it wasn't expanded to begin with - e.g. the consumer
  // marks an item selected once its route becomes active. Adjusted during
  // render rather than in an effect, so there is no frame with it still closed.
  const [wasActive, setWasActive] = useState(isActive);
  if (isActive !== wasActive) {
    setWasActive(isActive);
    if (isActive) {
      setExpanded(true);
    }
  }
  const toggle = () => setExpanded((value) => !value);
  const toggleFromEvent = (e: MouseEvent) => {
    e.stopPropagation();
    toggle();
  };
  // Toggle-only rows (no linkProps) toggle on the whole row and stop
  // propagation, so a consumer wrapping this in a closable container (e.g.
  // SidebarNav's mobile drawer) doesn't treat expand/collapse as a
  // selection. Rows that are also links toggle on click too, but let it
  // keep bubbling so navigation and close-on-select still happen.
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
              <ChevronDown size={20} strokeWidth={1.75} />
            </IconButton>
          )
        }
      >
        <ListItemButton
          {...(item.linkProps ?? {})}
          onClick={onRowClick}
          selected={item.selected}
          dense={dense}
          sx={{ ...buttonSx, pr: hasChildren ? 5 : buttonSx.px }}
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
          <List component="div" disablePadding sx={{ pl: 4.5 }}>
            {item.children!.map((child, childIndex) => (
              <SubNavChildItem key={childIndex} item={child} dense={dense} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function SubNavChildItem({ item, dense }: { item: NavItem; dense: boolean }) {
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

export { SubNavContent };
export type { SubNavContentProps, SubNavGroup };
