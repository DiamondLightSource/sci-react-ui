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
      disable: true,
      pages: {},
      description: {
        component: `
A collapsing/expanding sidebar for your app's primary navigation.

For normal screen sizes, the implementation uses MUI's permanent drawer toggling between two widths showing either icon and text or just icon.
For smaller screens, we use the temporary variant instead.`,
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
  render: (args) => {
    return (
      <Box sx={{ display: "flex" }}>
        <SidebarNav
          navigation={standardLinks}
          open={args.open}
          setOpen={args.setOpen}
        />
        <Typography>
          When using standard links, the caller must handle the selected state
          and set it to the correct item.
        </Typography>
      </Box>
    );
  },
  args: {
    navigation: standardLinks,
    open: true,
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
  render: (args) => {
    return (
      <Box sx={{ display: "flex" }}>
        <SidebarNav
          navigation={reactRouterNavigation}
          open={args.open}
          setOpen={args.setOpen}
        />
        <Typography>
          React Router <em>NavLinks</em> will handle selected state internally.
        </Typography>
      </Box>
    );
  },
  args: {
    navigation: reactRouterNavigation,
    open: false,
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
  render: (args) => {
    return (
      <Box sx={{ display: "flex" }}>
        <SidebarNav
          navigation={args.navigation}
          open={args.open}
          setOpen={args.setOpen}
        />
        <Typography>Sections are grouped with dividers</Typography>
      </Box>
    );
  },
  args: {
    navigation: groupedNavigation,
    open: true,
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
          <Typography>
            MUI wants to draw a Drawer above everything, so in this example the
            AppBar&apos;s zIndex is increased.
          </Typography>
        </Box>
      </Box>
    );
  },
};
