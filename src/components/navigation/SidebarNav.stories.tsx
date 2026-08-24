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
import { Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Logo } from "../controls/Logo";
import { ColourSchemeButton } from "../controls/ColourSchemeButton";
import { NavLink, MemoryRouter, type NavLinkProps } from "react-router-dom";

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
    // SidebarNav's permanent Drawer is position:fixed on desktop - the story
    // canvas's default padding wrapper would otherwise misalign it against
    // the normal-flow content beside it.
    fullBleed: true,
    docs: {
      description: {
        component: `Your app's primary navigation, with an optional contextual secondary panel alongside it. Without \`subNav\` this renders the collapsing/expanding primary drawer alone - a permanent drawer toggling between two widths (icon and text, or just icon) on normal screen sizes, and a temporary (overlaid) drawer on smaller screens. With \`subNav\`, SidebarNav also owns the responsive coordination between the two panels: on mobile only one drawer is visible at a time - opening the secondary panel drills in and hides the primary sidebar, and a back affordance drills back out. On desktop both panels are shown side by side. Which primary item a secondary panel belongs to (e.g. "Setup" having its own sub-navigation) is entirely up to the consumer - SidebarNav only owns the responsive mechanics, not when the panel opens.`,
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
      <Box sx={{ display: "flex", minHeight: "100%" }}>
        <SidebarNav navigation={standardLinks} open={open} setOpen={setOpen} />
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Main content here</Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  args: {
    navigation: standardLinks,
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
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Box sx={{ display: "flex", minHeight: "100%" }}>
        <SidebarNav
          navigation={reactRouterNavigation}
          open={open}
          setOpen={setOpen}
        />
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Main content here</Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  args: {
    navigation: reactRouterNavigation,
  },
  parameters: {
    docs: {
      description: {
        story: "React Router NavLinks will handle selected state internally.",
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
  render: (_args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Box sx={{ display: "flex", minHeight: "100%" }}>
        <SidebarNav
          navigation={groupedNavigation}
          open={open}
          setOpen={setOpen}
        />
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Main content here</Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Sections are grouped with dividers.",
      },
    },
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
      <Box sx={{ display: "flex", minHeight: "100%" }}>
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
        </Box>
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Main content here</Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The dashed boxes are only there to highlight what each slot renders - they aren't part of the component. afterNavSlot renders inside the scrollable area, right after the navigation items. footerSlot is pinned to the bottom of the drawer, outside the scroll area.",
      },
    },
  },
};

export const WithAppBar: Story = {
  render: (_args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Box sx={{ display: "flex", minHeight: "100%" }}>
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
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Toolbar /> {/* spacer equal to the AppBar's height */}
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Main content here</Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "MUI wants to draw a Drawer above everything, so in this example the AppBar's zIndex is increased. Clicking the menu icon toggles the sidebar open and closed.",
      },
    },
  },
};

const setupGroups = [
  {
    items: [
      {
        label: "General",
        linkProps: { to: "/setup/general", component: NavLink },
      },
      {
        label: "Devices",
        linkProps: { to: "/setup/devices", component: NavLink },
      },
      {
        label: "Permissions",
        linkProps: { to: "/setup/permissions", component: NavLink },
      },
    ],
  },
];

export const WithAppBarAndSubNav: Story = {
  render: () => {
    const theme = useTheme();
    const desktopLayout = useMediaQuery(theme.breakpoints.up("sm"));

    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [subNavOpen, setSubNavOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<
      "setup" | "acquisition" | "analysis"
    >("acquisition");

    // Only "Setup" has an associated secondary panel, so its link opens it
    // and every other top-level link closes it.
    const makeNavLink = React.useCallback(
      (id: "setup" | "acquisition" | "analysis", opensSubNav: boolean) => {
        const Component = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
          (props, ref) => (
            <NavLink
              ref={ref}
              {...props}
              onClick={(e) => {
                props.onClick?.(e);
                setSubNavOpen(opensSubNav);
                setSelectedItem(id);
              }}
            />
          ),
        );
        Component.displayName = `${id}Link`;
        return Component;
      },
      [],
    );
    const SetupLink = React.useMemo(
      () => makeNavLink("setup", true),
      [makeNavLink],
    );
    const AcquisitionLink = React.useMemo(
      () => makeNavLink("acquisition", false),
      [makeNavLink],
    );
    const AnalysisLink = React.useMemo(
      () => makeNavLink("analysis", false),
      [makeNavLink],
    );

    // On desktop the secondary panel is persistent chrome for the active
    // section, so it should always match `selectedItem` - even if it was
    // closed while drilling into it on mobile (selecting "General" closes
    // the mobile overlay without changing `selectedItem`).
    React.useEffect(() => {
      if (desktopLayout) {
        setSubNavOpen(selectedItem === "setup");
      }
    }, [desktopLayout, selectedItem]);

    // Selecting a destination inside the secondary panel closes both panels
    // on mobile, dropping all the way to main content. No-op on desktop,
    // where the panel stays open side by side.
    const ChildLink = React.useMemo(() => {
      const Component = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
        (props, ref) => (
          <NavLink
            ref={ref}
            {...props}
            onClick={(e) => {
              props.onClick?.(e);
              if (!desktopLayout) {
                setSubNavOpen(false);
                setSidebarOpen(false);
              }
            }}
          />
        ),
      );
      Component.displayName = "ChildLink";
      return Component;
    }, [desktopLayout]);

    const setupGroupsWithChildLinks = React.useMemo(
      () => [
        {
          items: [
            {
              label: "General",
              linkProps: { to: "/setup/general", component: ChildLink },
            },
            {
              label: "Devices",
              linkProps: { to: "/setup/devices", component: ChildLink },
            },
            {
              label: "Permissions",
              linkProps: { to: "/setup/permissions", component: ChildLink },
            },
          ],
        },
      ],
      [ChildLink],
    );

    const navigation = [
      {
        navItems: [
          {
            label: "Setup",
            icon: <Abc />,
            linkProps: { to: "/1", component: SetupLink },
            selected: selectedItem === "setup",
          },
          {
            label: "Acquisition",
            icon: <ArrowForward />,
            linkProps: { to: "/2", component: AcquisitionLink },
            selected: selectedItem === "acquisition",
          },
          {
            label: "Analysis",
            icon: <GraphicEq />,
            linkProps: { to: "/3", component: AnalysisLink },
            selected: selectedItem === "analysis",
          },
        ],
      },
    ];

    return (
      <Box sx={{ display: "flex", minHeight: "100%" }}>
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

        <SidebarNav
          navigation={navigation}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          subNav={{ title: "Setup", groups: setupGroupsWithChildLinks }}
          subNavOpen={subNavOpen}
          setSubNavOpen={setSubNavOpen}
        />

        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Toolbar /> {/* spacer equal to the AppBar's height */}
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Main content here</Typography>
          </Box>
        </Box>
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

const desktopSideBySideNavigation = [
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
];

export const DesktopSideBySide: Story = {
  // Real state so the drawers stay closeable if autodocs' real browser
  // viewport narrows this below desktop width.
  render: () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [subNavOpen, setSubNavOpen] = React.useState(true);

    return (
      <Box sx={{ display: "flex", minHeight: "100%" }}>
        <SidebarNav
          navigation={desktopSideBySideNavigation}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          subNav={{ title: "Setup", groups: setupGroups }}
          subNavOpen={subNavOpen}
          setSubNavOpen={setSubNavOpen}
        />
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Toolbar /> {/* spacer equal to the AppBar's height */}
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Main content here</Typography>
          </Box>
        </Box>
      </Box>
    );
  },
};
