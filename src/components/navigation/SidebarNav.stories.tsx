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
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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
      story: {
        height: "600px",
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
  render: (_args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Box sx={{ display: "flex" }}>
        <SidebarNav navigation={standardLinks} open={open} setOpen={setOpen} />
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
          <Typography>
            When using standard links, the caller must handle the selected state
            and set it to the correct item.
          </Typography>
        </Box>
      </Box>
    );
  },
  args: {
    navigation: standardLinks,
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
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Box sx={{ display: "flex" }}>
        <SidebarNav
          navigation={reactRouterNavigation}
          open={open}
          setOpen={setOpen}
        />
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
          <Typography>
            React Router <em>NavLinks</em> will handle selected state
            internally.
          </Typography>
        </Box>
      </Box>
    );
  },
  args: {
    navigation: reactRouterNavigation,
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
  render: (_args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Box sx={{ display: "flex" }}>
        <SidebarNav
          navigation={groupedNavigation}
          open={open}
          setOpen={setOpen}
        />
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
          <Typography>Sections are grouped with dividers.</Typography>
        </Box>
      </Box>
    );
  },
};

/** A dashed, tinted wrapper so it's obvious in the story which content is coming from a slot vs. the `navigation` prop. */
const SlotOutline = ({
  label,
  open,
  children,
}: {
  label: string;
  open: boolean;
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      m: 1,
      mt: 0,
      border: "1px dashed",
      borderColor: "divider",
      borderRadius: 2,
      bgcolor: "action.hover",
      overflow: "hidden",
    }}
  >
    {open && (
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ display: "block", px: 1.5, pt: 0.5 }}
      >
        {label}
      </Typography>
    )}
    {children}
  </Box>
);

export const WithSlots: Story = {
  render: (_args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Box sx={{ display: "flex" }}>
        <SidebarNav
          navigation={groupedNavigation}
          open={open}
          setOpen={setOpen}
          afterNavSlot={
            <SlotOutline label="afterNavSlot" open={open}>
              <List sx={{ p: 0.5, pt: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    href="https://www.example.com/docs"
                    sx={{ p: 1, borderRadius: 2, gap: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Insights />
                    </ListItemIcon>
                    <ListItemText
                      primary="Documentation"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </SlotOutline>
          }
          footerSlot={
            <SlotOutline label="footerSlot" open={open}>
              <List sx={{ p: 0.5, pt: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    href="#settings"
                    sx={{ p: 1, borderRadius: 2, gap: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CorporateFare />
                    </ListItemIcon>
                    <ListItemText
                      primary="Settings"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </SlotOutline>
          }
        />
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
          <Typography>
            Adds slots to the navbar, boxes are only there to highlight what
            each slot renders, they aren&apos;t part of the component.{" "}
            <em>afterNavSlot</em> renders inside the scrollable area, right
            after the navigation items. <em>footerSlot</em> is pinned to the
            bottom of the drawer, outside the scroll area.
          </Typography>
        </Box>
      </Box>
    );
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
  parameters: {
    // SidebarNav's permanent Drawer is position:fixed on desktop - the story
    // canvas's default padding wrapper would otherwise misalign it against
    // the normal-flow main content beside it.
    fullBleed: true,
  },
};
