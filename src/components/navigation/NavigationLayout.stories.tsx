import { Abc, ArrowForward, GraphicEq, Menu } from "@mui/icons-material";
import { NavigationLayout } from "./NavigationLayout";
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
import { NavLink, MemoryRouter, type NavLinkProps } from "react-router-dom";

const meta: Meta<typeof NavigationLayout> = {
  title: "Components/Navigation/NavigationLayout",
  component: NavigationLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    // NavigationLayout always renders SidebarNav, which is position:fixed on
    // desktop - the story canvas's default padding wrapper would otherwise
    // misalign it against the normal-flow SecondaryNav/main content beside it.
    fullBleed: true,
    docs: {
      description: {
        component: `Composes SidebarNav and SecondaryNav, owning the responsive coordination between them. On mobile only one drawer is visible at a time - opening the secondary panel drills in and hides the primary sidebar, and a back affordance drills back out. On desktop both panels are shown side by side. Which primary item a secondary panel belongs to (e.g. "Setup" having its own sub-navigation) is entirely up to the consumer - NavigationLayout only owns the responsive mechanics, not when the panel opens.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const setupGroups = [
  {
    items: [
      {
        id: "general",
        label: "General",
        linkProps: { to: "/setup/general", component: NavLink },
      },
      {
        id: "devices",
        label: "Devices",
        linkProps: { to: "/setup/devices", component: NavLink },
      },
      {
        id: "permissions",
        label: "Permissions",
        linkProps: { to: "/setup/permissions", component: NavLink },
      },
    ],
  },
];

export const WithAppBar: Story = {
  render: () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [secondaryNavOpen, setSecondaryNavOpen] = React.useState(false);

    // Only "Setup" has an associated secondary panel, so its link opens it and
    // every other top-level link closes it - in a real app this would instead
    // be derived from the current route, not from click handlers on each link.
    const SetupLink = React.useMemo(() => {
      const Component = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
        (props, ref) => (
          <NavLink
            ref={ref}
            {...props}
            onClick={(e) => {
              props.onClick?.(e);
              setSecondaryNavOpen(true);
            }}
          />
        ),
      );
      Component.displayName = "SetupLink";
      return Component;
    }, []);
    const OtherLink = React.useMemo(() => {
      const Component = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
        (props, ref) => (
          <NavLink
            ref={ref}
            {...props}
            onClick={(e) => {
              props.onClick?.(e);
              setSecondaryNavOpen(false);
            }}
          />
        ),
      );
      Component.displayName = "OtherLink";
      return Component;
    }, []);

    const navigation = [
      {
        navItems: [
          {
            label: "Setup",
            icon: <Abc />,
            linkProps: { to: "/1", component: SetupLink },
          },
          {
            label: "Acquisition",
            icon: <ArrowForward />,
            linkProps: { to: "/2", component: OtherLink },
            selected: true,
          },
          {
            label: "Analysis",
            icon: <GraphicEq />,
            linkProps: { to: "/3", component: OtherLink },
          },
        ],
      },
    ];

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
              onClick={() => setSidebarOpen(!sidebarOpen)}
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
              sx={{ ml: 1.5, mt: 1.25, mr: 1.25 }}
            >
              My app
            </Typography>

            <Box sx={{ ml: "auto" }}>
              <ColourSchemeButton />
            </Box>
          </Toolbar>
        </AppBar>

        <NavigationLayout
          navigation={navigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          secondaryNav={{ title: "Setup", groups: setupGroups }}
          secondaryNavOpen={secondaryNavOpen}
          setSecondaryNavOpen={setSecondaryNavOpen}
        >
          <Typography variant="h5">Main content here</Typography>
        </NavigationLayout>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Clicking "Setup" opens its secondary panel; clicking any other top-level item closes it. On a mobile viewport this drills in and replaces the sidebar, with a back arrow in the panel\'s header to drill back out. On a desktop viewport the panel appears side by side with the sidebar.',
      },
    },
  },
};

export const DesktopSideBySide: Story = {
  args: {
    navigation: [
      {
        navItems: [
          {
            label: "Setup",
            icon: <Abc />,
            linkProps: { to: "/1", component: NavLink },
            selected: true,
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
    ],
    sidebarOpen: true,
    setSidebarOpen: () => {},
    secondaryNav: { title: "Setup", groups: setupGroups },
    secondaryNavOpen: true,
    setSecondaryNavOpen: () => {},
    children: <Typography variant="h5">Main content here</Typography>,
  },
};
