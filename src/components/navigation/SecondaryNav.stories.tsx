import { Abc, ArrowForward, GraphicEq } from "@mui/icons-material";
import { SecondaryNav } from "./SecondaryNav";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NavLink, MemoryRouter } from "react-router-dom";

const meta: Meta<typeof SecondaryNav> = {
  title: "Components/Navigation/SecondaryNav",
  component: SecondaryNav,
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
        component: `An optional contextual navigation panel that sits next to SidebarNav. Mostly ListItems, optionally with a title, search, grouped sections, and one-level expandable rows. Use NavigationLayout to compose it with SidebarNav and get the responsive mobile drill-down / desktop side-by-side behaviour for free.`,
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
        id: "setup",
        label: "Setup",
        linkProps: { to: "/1", component: NavLink },
      },
      {
        id: "acquisition",
        label: "Acquisition",
        linkProps: { to: "/2", component: NavLink },
        selected: true,
      },
      {
        id: "analysis",
        label: "Analysis",
        linkProps: { to: "/3", component: NavLink },
      },
    ],
  },
];

export const Basic: Story = {
  args: {
    groups: basicGroups,
    open: true,
    setOpen: () => {},
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
    open: true,
    setOpen: () => {},
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
      <SecondaryNav
        title="Experiments"
        groups={basicGroups}
        open={true}
        setOpen={() => {}}
        search={{ value, onChange: setValue, placeholder: "Search items" }}
      />
    );
  },
};

const groupedGroups = [
  {
    subheader: "Recent",
    items: [
      {
        id: "setup",
        label: "Setup",
        icon: <Abc />,
        linkProps: { to: "/1", component: NavLink },
      },
      {
        id: "acquisition",
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
        id: "analysis",
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
    open: true,
    setOpen: () => {},
  },
};

const expandableGroups = [
  {
    items: [
      {
        id: "analysis",
        label: "Analysis",
        icon: <GraphicEq />,
        defaultExpanded: true,
        children: [
          { id: "analysis-a", label: "Run A" },
          { id: "analysis-b", label: "Run B" },
        ],
      },
      {
        id: "acquisition",
        label: "Acquisition",
        icon: <ArrowForward />,
        linkProps: { to: "/2", component: NavLink },
        children: [{ id: "acquisition-a", label: "Session 1" }],
      },
    ],
  },
];

export const WithExpandableItems: Story = {
  args: {
    groups: expandableGroups,
    open: true,
    setOpen: () => {},
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
    open: true,
    setOpen: () => {},
    onBack: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "onBack is normally supplied by NavigationLayout on mobile to drill back to the primary sidebar, shown here in isolation.",
      },
    },
  },
};
