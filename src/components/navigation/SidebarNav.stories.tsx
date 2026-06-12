import {
  Abc,
  ArrowForward,
  CorporateFare,
  GraphicEq,
  Menu,
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

const meta: Meta<typeof SidebarNav> = {
  title: "Components/Navigation/SidebarNav",
  component: SidebarNav,
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

const navigation = [
  {
    navItems: [
      {
        label: "Setup",
        icon: <Abc />,
        linkProps: { href: "#1" },
      },
      {
        label: "Acquisition",
        icon: <ArrowForward />,
        linkProps: { href: "#2" },
      },
      {
        label: "Analysis",
        icon: <GraphicEq />,
        linkProps: { href: "#3" },
      },
    ],
  },
  {
    navItems: [
      {
        label: "Organisation",
        icon: <CorporateFare />,
        linkProps: { href: "" },
      },
    ],
  },
];

export const Basic: Story = {
  args: {
    navigation,
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
          // color="inherit"
          sx={{
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          }}
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

            <Box sx={{ mr: 2, width: 100 }}>
              <Logo />
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

        <SidebarNav navigation={navigation} open={open} />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "MUI wants to draw a Drawer above everything, so in this example the AppBar's zIndex is increased.",
      },
    },
  },
};
