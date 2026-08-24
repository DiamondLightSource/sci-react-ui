import { Abc, ArrowForward, GraphicEq } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
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
        component: `The content of a contextual secondary navigation panel: a header (title/search slot/back) plus a grouped, optionally-expandable list. Presentation-agnostic - it renders no Drawer or panel of its own. Use SidebarNav's \`subNav\` prop to get the responsive mobile drill-down / desktop side-by-side behaviour around it.`,
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
        story: "dense defaults to true - rows are compact by default.",
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
        story: "Set dense={false} for taller, more touch-friendly rows.",
      },
    },
  },
};

export const WithTitleAndSearch: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <SubNavContent
        title="Experiments"
        groups={basicGroups}
        searchSlot={
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search items"
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
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "searchSlot takes any ReactNode - SubNavContent has no search logic of its own, so filtering `groups` in response to the value is entirely up to the consumer.",
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
          "One level of expand/collapse only. A row with both a link and children navigates and expands together on label click, or can be expanded on its own via the chevron. A selected item (or one with a selected child) auto-expands.",
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
          "onBack is normally supplied by SidebarNav on mobile to drill back to the primary sidebar, shown here in isolation.",
      },
    },
  },
};
