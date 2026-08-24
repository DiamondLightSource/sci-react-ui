import { render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { SidebarNav, type Navigation } from "./SidebarNav";
import type { SubNavContentProps } from "./SubNav";
import { createMemoryRouter, NavLink, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import useMediaQuery from "@mui/material/useMediaQuery";
import { addProviders } from "../../__test-utils__/helpers";

vi.mock("@mui/material/useMediaQuery");

const mockedUseMediaQuery = vi.mocked(useMediaQuery);

describe("SidebarNav", () => {
  describe("primary nav only (no subNav)", () => {
    const navigation: Navigation = [
      {
        navItems: [
          {
            label: "Setup",
            icon: <div data-testid="navicon1" />,
            linkProps: { component: NavLink, to: "/setup" },
          },
          {
            label: "Acquisition",
            icon: <div data-testid="navicon2" />,
            linkProps: { component: NavLink, to: "/acq" },
          },
          {
            label: "Analysis",
            icon: <div data-testid="navicon3" />,
            linkProps: { component: NavLink, to: "/analysis" },
          },
        ],
      },
      {
        navItems: [
          {
            label: "Organisation",
            icon: <div data-testid="navicon4" />,
            linkProps: { href: "https://www.example.com" },
          },
        ],
      },
    ];

    function renderSidenav(
      open: boolean,
      setOpen = vi.fn(),
      hasAppBar = false,
    ) {
      const router = createMemoryRouter([
        {
          path: "/",
          element: (
            <SidebarNav
              navigation={navigation}
              open={open}
              setOpen={setOpen}
              hasAppBar={hasAppBar}
            />
          ),
        },
      ]);
      render(<RouterProvider router={router} />);
    }

    describe("Desktop layout", () => {
      beforeEach(() => {
        mockedUseMediaQuery.mockReturnValue(true);
      });

      it("shows icons and names when open", () => {
        renderSidenav(true);

        const items = navigation[0].navItems;

        items.forEach((item) => {
          const button = screen.getByRole("link", { name: item.label });
          expect(button).toBeVisible();
          const label = screen.getByText(item.label);
          expect(label).toBeVisible();
        });
        ["navicon1", "navicon2", "navicon3", "navicon4"].forEach((id) =>
          expect(screen.getByTestId(id)).toBeVisible(),
        );
      });

      it("shows icons only when closed", () => {
        renderSidenav(false);
        const items = navigation[0].navItems;
        items.forEach((item) => {
          const button = screen.getByRole("link", { name: item.label });
          expect(button).toBeVisible(); // a11y-wise still visible
          const label = screen.getByText(item.label);
          expect(label).toBeInTheDocument(); // label exists but
          expect(label).not.toBeVisible(); // not visible
        });
        ["navicon1", "navicon2", "navicon3", "navicon4"].forEach((id) =>
          expect(screen.getByTestId(id)).toBeVisible(),
        );
      });

      it("shows tooltip on buttons when closed", async () => {
        renderSidenav(false);

        const icon = screen.getByTestId("navicon2");
        const user = userEvent.setup();
        await user.hover(icon);

        // notice we await because the tooltip appears after some time
        const tooltip = await screen.findByRole("tooltip", {
          name: "Acquisition",
        });
        expect(tooltip).toBeVisible();
      });

      it("shows no tooltip on buttons when open", async () => {
        renderSidenav(true);

        const icon = screen.getByTestId("navicon2");
        const user = userEvent.setup();
        await user.hover(icon);

        const tooltip = screen.queryByRole("tooltip", {
          name: "Acquisition",
        });
        expect(tooltip).not.toBeInTheDocument();
      });

      it("creates divider between nav sections", () => {
        renderSidenav(true);
        const divider = screen.queryByRole("separator");
        expect(divider).toBeInTheDocument();
      });

      it("does not reserve space for an AppBar when hasAppBar is not set", () => {
        renderSidenav(true);
        expect(
          document.querySelector(".MuiToolbar-root"),
        ).not.toBeInTheDocument();
      });

      it("reserves space for an AppBar when hasAppBar is set", () => {
        renderSidenav(true, vi.fn(), true);
        expect(document.querySelector(".MuiToolbar-root")).toBeInTheDocument();
      });

      it("renders afterNavSlot after the navigation items", () => {
        const router = createMemoryRouter([
          {
            path: "/",
            element: (
              <SidebarNav
                navigation={navigation}
                open={true}
                setOpen={vi.fn()}
                afterNavSlot={<div data-testid="after-nav">Extra links</div>}
              />
            ),
          },
        ]);
        render(<RouterProvider router={router} />);

        expect(screen.getByTestId("after-nav")).toBeVisible();
      });

      it("renders footerSlot", () => {
        const router = createMemoryRouter([
          {
            path: "/",
            element: (
              <SidebarNav
                navigation={navigation}
                open={true}
                setOpen={vi.fn()}
                footerSlot={<div data-testid="footer">User menu</div>}
              />
            ),
          },
        ]);
        render(<RouterProvider router={router} />);

        expect(screen.getByTestId("footer")).toBeVisible();
      });

      it("renders internal and external links with correct href", () => {
        // even though specified differently, ultimately both types
        // should have the correct href attribute
        renderSidenav(true);

        const externalLink = screen.getByRole("link", {
          name: "Organisation",
        });
        expect(externalLink).toHaveAttribute("href", "https://www.example.com");

        const internalLink = screen.getByRole("link", { name: "Setup" });
        expect(internalLink).toHaveAttribute("href", "/setup");
      });
    });

    describe("Mobile layout", () => {
      beforeEach(() => {
        mockedUseMediaQuery.mockReturnValue(false);
      });

      it("renders temporary drawer", () => {
        renderSidenav(true);

        // Drawer paper is rendered
        expect(document.querySelector(".MuiDrawer-root")).toBeInTheDocument();

        // nav content is visible
        expect(screen.getByText("Setup")).toBeVisible();
      });

      it("is not visible when the drawer is closed", () => {
        renderSidenav(false);

        expect(screen.queryByText("Setup")).not.toBeInTheDocument();
        expect(
          screen.queryByRole("link", { name: "Setup" }),
        ).not.toBeInTheDocument();
      });

      it("is visible when the drawer is open", () => {
        renderSidenav(true);

        expect(screen.getByText("Setup")).toBeVisible();
        expect(screen.getByTestId("navicon1")).toBeVisible();
      });

      it("closes the drawer when a nav item is clicked", async () => {
        const user = userEvent.setup();
        const setOpen = vi.fn();

        renderSidenav(true, setOpen);

        await user.click(screen.getByRole("link", { name: "Setup" }));

        expect(setOpen).toHaveBeenCalledWith(false);
      });

      it("closes the drawer when the backdrop is clicked", async () => {
        const user = userEvent.setup();
        const setOpen = vi.fn();

        renderSidenav(true, setOpen);

        // backdrop is rendered by MUI in portal
        const backdrop = document.querySelector(".MuiBackdrop-root");
        expect(backdrop).toBeInTheDocument();

        await user.click(backdrop!);

        expect(setOpen).toHaveBeenCalledWith(false);
      });
    });
  });

  describe("with subNav", () => {
    const navigation: Navigation = [
      {
        navItems: [
          {
            label: "Setup",
            icon: <div data-testid="navicon" />,
            linkProps: { component: NavLink, to: "/setup" },
          },
        ],
      },
    ];

    const subNav: Omit<SubNavContentProps, "onBack"> = {
      title: "Secondary",
      groups: [
        {
          items: [
            {
              label: "Detail",
              linkProps: { component: NavLink, to: "/detail" },
            },
          ],
        },
      ],
    };

    function Harness({
      initialOpen = true,
      initialSubNavOpen = false,
      withSubNav = true,
    }: {
      initialOpen?: boolean;
      initialSubNavOpen?: boolean;
      withSubNav?: boolean;
    }) {
      const [open, setOpen] = useState(initialOpen);
      const [subNavOpen, setSubNavOpen] = useState(initialSubNavOpen);

      return withSubNav ? (
        <SidebarNav
          navigation={navigation}
          open={open}
          setOpen={setOpen}
          subNav={subNav}
          subNavOpen={subNavOpen}
          setSubNavOpen={setSubNavOpen}
        />
      ) : (
        <SidebarNav navigation={navigation} open={open} setOpen={setOpen} />
      );
    }

    function renderHarness(props: React.ComponentProps<typeof Harness> = {}) {
      const router = createMemoryRouter([
        { path: "/", element: <Harness {...props} /> },
      ]);
      render(addProviders(<RouterProvider router={router} />));
    }

    describe("Desktop layout", () => {
      beforeEach(() => {
        mockedUseMediaQuery.mockReturnValue(true);
      });

      it("renders both panels simultaneously when both are open", () => {
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: true,
        });

        expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
        expect(
          screen.getByRole("heading", { name: "Secondary" }),
        ).toBeVisible();
        expect(screen.getByRole("link", { name: "Detail" })).toBeVisible();
      });

      it("hides only the secondary panel when subNavOpen is false", () => {
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: false,
        });

        expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
        expect(screen.queryByText("Secondary")).not.toBeVisible();
      });

      it("renders no secondary panel when subNav is omitted", () => {
        renderHarness({ withSubNav: false });

        expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
        expect(
          screen.queryByRole("heading", { name: "Secondary" }),
        ).not.toBeInTheDocument();
      });
    });

    describe("Mobile layout", () => {
      beforeEach(() => {
        mockedUseMediaQuery.mockReturnValue(false);
      });

      it("shows only the sidebar when secondary nav is not open", () => {
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: false,
        });

        expect(screen.getByText("Setup")).toBeVisible();
        expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
      });

      it("hides the sidebar drawer and shows the secondary content in its own temporary drawer when the secondary panel opens", () => {
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: true,
        });

        expect(screen.queryByText("Setup")).not.toBeInTheDocument();
        expect(screen.getByText("Secondary")).toBeVisible();
        expect(screen.getByRole("link", { name: "Detail" })).toBeVisible();
        // Only one drawer mounted at a time on mobile - the sidebar's is
        // closed (and unmounted), the secondary content's is open.
        expect(document.querySelectorAll(".MuiDrawer-root")).toHaveLength(1);
      });

      it("closes the secondary drawer when a nav item inside it is clicked", async () => {
        const user = userEvent.setup();
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: true,
        });

        await user.click(screen.getByRole("link", { name: "Detail" }));

        await waitFor(() => {
          expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
        });
      });

      it("closes the secondary drawer when the backdrop is clicked", async () => {
        const user = userEvent.setup();
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: true,
        });

        const backdrop = document.querySelector(".MuiBackdrop-root");
        expect(backdrop).toBeInTheDocument();

        await user.click(backdrop!);

        await waitFor(() => {
          expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
        });
      });

      it("drills back to the sidebar via the back button", async () => {
        const user = userEvent.setup();
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: true,
        });

        expect(screen.queryByText("Setup")).not.toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "Back" }));

        await waitFor(() => {
          expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
        });
        expect(screen.getByText("Setup")).toBeVisible();
      });

      it("renders no secondary panel when subNav is omitted", () => {
        renderHarness({ withSubNav: false });

        expect(screen.getByText("Setup")).toBeVisible();
        expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
      });

      it("still reaches the sidebar via the back button even if secondary nav opened while open was false", async () => {
        // Opens the secondary panel without the sidebar ever having been
        // marked open first (e.g. deep-linking straight into it) - exercises
        // SidebarNav's self-heal of `open`.
        const user = userEvent.setup();
        renderHarness({
          initialOpen: false,
          initialSubNavOpen: true,
        });

        await waitFor(() => {
          expect(screen.getByRole("button", { name: "Back" })).toBeVisible();
        });
        await user.click(screen.getByRole("button", { name: "Back" }));

        await waitFor(() => {
          expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
        });
        expect(screen.getByText("Setup")).toBeVisible();
      });

      it("responds to a popstate notification (e.g. a real device/browser back navigation) by drilling back to the sidebar", async () => {
        renderHarness({
          initialOpen: true,
          initialSubNavOpen: true,
        });

        expect(screen.queryByText("Setup")).not.toBeInTheDocument();

        // SidebarNav pushed a history entry when the secondary panel opened
        // (see the effect in SidebarNav.tsx), so dispatching the same
        // "popstate" event a real back navigation would fire is a faithful
        // simulation of the user pressing back, not just an arbitrary event.
        window.dispatchEvent(new PopStateEvent("popstate"));

        await waitFor(() => {
          expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
        });
        expect(screen.getByText("Setup")).toBeVisible();
      });
    });
  });
});
