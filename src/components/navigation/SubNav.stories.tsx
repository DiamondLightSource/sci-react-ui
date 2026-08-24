import {
  Abc,
  ArrowForward,
  GraphicEq,
  Insights,
  Settings,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { SubNavContent } from "./SubNav";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NavLink, MemoryRouter } from "react-router-dom";

const meta: Meta<typeof SubNavContent> = {
  title: "Components/Navigation/SubNav",
  component: SubNavContent,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `The content of a contextual secondary navigation panel: a header (\`title\`/back) plus a grouped, optionally-expandable list. Presentation-agnostic — it renders no Drawer or panel of its own. Use SidebarNav's \`subNav\` prop to get the responsive mobile drill-down / desktop side-by-side behaviour around it.

- **\`beforeNavSlot\` / \`afterNavSlot\`**: rendered inside the scrollable area, before/after the item list.
- **\`footerSlot\`**: pinned to the bottom of the panel, outside the scrollable area.

**Using slots**
- There's no dedicated search prop. Put a search field in \`beforeNavSlot\` (see \`WithSlots\`) and filter \`groups\` yourself in response to its value.
- Reach for \`footerSlot\` for persistent actions (like settings or account links) that should stay visible regardless of scroll position; use \`afterNavSlot\` for content that's part of the same scrollable list.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicGroups = [
  {
    items: [
      {
        label: "Setup",
        linkProps: { to: "/1", component: NavLink },
      },
      {
        label: "Acquisition",
        linkProps: { to: "/2", component: NavLink },
      },
      {
        label: "Analysis",
        linkProps: { to: "/3", component: NavLink },
      },
    ],
  },
];

export const Basic: Story = {
  args: {
    groups: basicGroups,
  },
  parameters: {
    docs: {
      description: {
        story: "`dense` defaults to `true` - rows are compact by default.",
      },
    },
  },
};

export const Comfortable: Story = {
  args: {
    groups: basicGroups,
    dense: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Set `dense={false}` for taller, more touch-friendly rows.",
      },
    },
  },
};

export const WithTitle: Story = {
  args: {
    title: "Experiments",
    groups: basicGroups,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the header's `title`, with no back button or slots.",
      },
    },
  },
};

/** A dashed, tinted wrapper so it's obvious in the story which content is coming from a slot vs. the `groups` prop. */
const SlotOutline = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      m: 1,
      border: "1px dashed",
      borderColor: "divider",
      borderRadius: 2,
      bgcolor: "action.hover",
      overflow: "hidden",
    }}
  >
    <Typography
      variant="overline"
      color="text.secondary"
      sx={{ display: "block", px: 1.5, pt: 0.5 }}
    >
      {label}
    </Typography>
    {children}
  </Box>
);

const slotListItem = (icon: React.ReactNode, label: string, href: string) => (
  <List sx={{ p: 0.5, pt: 0 }}>
    <ListItem disablePadding>
      <ListItemButton href={href} sx={{ p: 1, borderRadius: 2, gap: 1.5 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  </List>
);

export const WithSlots: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <SubNavContent
        title="Experiments"
        groups={basicGroups}
        beforeNavSlot={
          <SlotOutline label="beforeNavSlot">
            <TextField
              fullWidth
              size="small"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search items"
              sx={{ p: 1 }}
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
          </SlotOutline>
        }
        afterNavSlot={
          <SlotOutline label="afterNavSlot">
            {slotListItem(
              <Insights fontSize="small" />,
              "Documentation",
              "https://www.example.com/docs",
            )}
          </SlotOutline>
        }
        footerSlot={
          <SlotOutline label="footerSlot">
            {slotListItem(
              <Settings fontSize="small" />,
              "Settings",
              "#settings",
            )}
          </SlotOutline>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The dashed boxes are only there to highlight what each slot renders - they aren't part of the component. `beforeNavSlot` (here, a search field) and `afterNavSlot` render inside the scrollable area, right before and after the item list; `SubNavContent` has no search logic of its own, so filtering `groups` in response to the value is entirely up to the consumer. `footerSlot` is pinned to the bottom of the panel, outside the scroll area.",
      },
    },
  },
};

const groupedGroups = [
  {
    subheader: "Recent",
    items: [
      {
        label: "Setup",
        icon: <Abc />,
        linkProps: { to: "/1", component: NavLink },
      },
      {
        label: "Acquisition",
        icon: <ArrowForward />,
        linkProps: { to: "/2", component: NavLink },
      },
    ],
  },
  {
    subheader: "All experiments",
    items: [
      {
        label: "Analysis",
        icon: <GraphicEq />,
        linkProps: { to: "/3", component: NavLink },
      },
    ],
  },
];

export const GroupedWithSubheaders: Story = {
  args: {
    groups: groupedGroups,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Set `subheader` on a group in `groups` to label it - a divider is added between groups automatically.",
      },
    },
  },
};

const expandableGroups = [
  {
    items: [
      {
        label: "Analysis",
        icon: <GraphicEq />,
        defaultExpanded: true,
        children: [{ label: "Run A" }, { label: "Run B" }],
      },
      {
        label: "Acquisition",
        icon: <ArrowForward />,
        linkProps: { to: "/2", component: NavLink },
        children: [{ label: "Session 1" }],
      },
    ],
  },
];

export const WithExpandableItems: Story = {
  args: {
    groups: expandableGroups,
  },
  parameters: {
    docs: {
      description: {
        story:
          "One level of expand/collapse only, via each item's `children`. A row with both `linkProps` and `children` navigates and expands together on label click, or can be expanded on its own via the chevron. A selected item (or one with a selected child) auto-expands; set `defaultExpanded` to start a row open.",
      },
    },
  },
};

export const WithBackButton: Story = {
  args: {
    title: "Experiments",
    groups: basicGroups,
    onBack: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "`onBack` is normally supplied by SidebarNav on mobile to drill back to the primary sidebar, shown here in isolation.",
      },
    },
  },
};
