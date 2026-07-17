import {
  Abc,
  ArrowForward,
  CorporateFare,
  GraphicEq,
  Insights,
  Menu,
  Schedule,
} from "@mui/icons-material";
import { SidebarNav } from "./SidebarNav";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "../MUI/MuiWrapped";
import { Theme } from "@mui/material/styles";
import { Logo } from "../controls/Logo";
import { ColourSchemeButton } from "../controls/ColourSchemeButton";
import { NavLink, MemoryRouter } from "react-router-dom";

const meta: Meta<typeof SidebarNav> = {
  title: "Components/Navigation/SidebarNav",
  component: SidebarNav,
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
      pages: {},
      description: {
        component: `A collapsing/expanding sidebar for your app's primary navigation. Click on the individual stories to see the examples.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const standardLinks = [
  {
    navItems: [
      {
        label: "Setup",
        icon: <Abc />,
        linkProps: { href: "" },
      },
      {
        label: "Acquisition",
        icon: <ArrowForward />,
        linkProps: { href: "" },
        selected: true,
      },
      {
        label: "Analysis",
        icon: <GraphicEq />,
        linkProps: { href: "" },
      },
    ],
  },
];

export const NormalLinks: Story = {
  args: {
    navigation: standardLinks,
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When using standard links, the caller must handle the selected state and set it to the correct item.",
      },
    },
  },
};

const reactRouterNavigation = [
  {
    navItems: [
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
      {
        label: "Analysis",
        icon: <GraphicEq />,
        linkProps: { to: "/3", component: NavLink },
      },
    ],
  },
  {
    navItems: [
      {
        label: "Organisation",
        icon: <CorporateFare />,
        linkProps: { to: "/4", component: NavLink },
      },
    ],
  },
];

export const RouterLinks: Story = {
  args: {
    navigation: reactRouterNavigation,
    open: false,
  },
  parameters: {
    docs: {
      description: {
        story: `React Router _NavLinks_ will handle selected state internally.`,
      },
    },
  },
};

const groupedNavigation = [
  {
    navItems: [
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
    navItems: [
      {
        label: "Analysis",
        icon: <GraphicEq />,
        linkProps: { to: "/3", component: NavLink },
      },
      {
        label: "Data Browse",
        icon: <Insights />,
        linkProps: { to: "/4", component: NavLink },
      },
    ],
  },
  {
    navItems: [
      {
        label: "Log",
        icon: <Schedule />,
        linkProps: { to: "/5", component: NavLink },
      },
    ],
  },
];

export const GroupedNavigation: Story = {
  args: {
    navigation: groupedNavigation,
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Sections are grouped with dividers",
      },
    },
  },
};

export const WithAppBar: Story = {
  render: (_args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          color="inherit"
          sx={{
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </IconButton>

            <Box sx={{ mr: 2, mt: 1.5 }}>
              <Logo sx={{ display: "block" }} />
            </Box>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                ml: 1.5,
                mt: 1.25,
                mr: 1.25,
              }}
            >
              My app
            </Typography>

            <Box sx={{ ml: "auto" }}>
              <ColourSchemeButton />
            </Box>
          </Toolbar>
        </AppBar>

        <SidebarNav
          navigation={reactRouterNavigation}
          open={open}
          setOpen={setOpen}
        />
        <Box>
          <Toolbar />
          <Typography variant="h5">Main content here</Typography>
        </Box>
      </Box>
    );
  },
  parameters: {
    // SidebarNav's permanent Drawer is position:fixed on desktop - the story
    // canvas's default padding wrapper would otherwise misalign it against
    // the normal-flow main content beside it.
    fullBleed: true,
    docs: {
      description: {
        story:
          "MUI wants to draw a Drawer above everything, so in this example the AppBar's zIndex is increased.",
      },
    },
  },
};
