import {
  Box,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import {
  Fragment,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import type { LinkProps } from "./types";

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

type SecondaryNavContentProps = {
  title?: string;

  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };

  groups: SecondaryNavGroup[];

  /**
   * Renders a back affordance above the title/search when provided.
   * NavigationLayout supplies this on mobile only; omit for standalone use.
   */
  onBack?: () => void;

  /** Compact row height/spacing, suited to longer lists. Defaults to true. */
  dense?: boolean;
};

/**
 * Just the contextual nav's content - a header (title/search/back) plus a
 * grouped, optionally-expandable list. Presentation (Drawer vs. side-by-side
 * panel, responsive switching) is NavigationLayout's job, not this
 * component's.
 */
function SecondaryNavContent(props: SecondaryNavContentProps) {
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

function SecondaryNavHeader(props: SecondaryNavContentProps) {
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
  // Toggle-only rows (no linkProps) toggle on the whole row and stop
  // propagation, so a consumer wrapping this in a closable container (e.g.
  // NavigationLayout's mobile drawer) doesn't treat expand/collapse as a
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

export { SecondaryNavContent };
export type {
  SecondaryNavContentProps,
  SecondaryNavGroup,
  SecondaryNavItemDefinition,
  SecondaryNavChildItemDefinition,
};
