import { render, screen } from "@testing-library/react";
import { Navigation, SidebarNav } from "./SidebarNav";
import { createMemoryRouter, NavLink, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import useMediaQuery from "@mui/material/useMediaQuery";

vi.mock("@mui/material/useMediaQuery");

const mockedUseMediaQuery = vi.mocked(useMediaQuery);

describe("SidebarNav", () => {
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
        {
          label: "Documentation",
          icon: <div data-testid="navicon5" />,
          linkProps: { href: "https://docs.example.com" },
          external: true,
        },
      ],
    },
  ];

  function renderSidenav(open: boolean, setOpen = vi.fn()) {
    const router = createMemoryRouter([
      {
        path: "/",
        element: (
          <SidebarNav navigation={navigation} open={open} setOpen={setOpen} />
        ),
      },
    ]);
    render(<RouterProvider router={router} />);
  }

  describe("Desktop layout", () => {
    beforeEach(() => {
      mockedUseMediaQuery.mockReturnValue(true);
    });

    it("Shows icons and names when open", () => {
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

    it("Shows icons only when closed", () => {
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

      const externalLink = screen.getByRole("link", { name: "Organisation" });
      expect(externalLink).toHaveAttribute("href", "https://www.example.com");

      const internalLink = screen.getByRole("link", { name: "Setup" });
      expect(internalLink).toHaveAttribute("href", "/setup");
    });

    it("opens external items in a new tab", () => {
      renderSidenav(true);

      const externalLink = screen.getByRole("link", {
        name: "Documentation (opens in new tab)",
      });
      expect(externalLink).toHaveAttribute("target", "_blank");
      expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");

      const nonExternalLink = screen.getByRole("link", {
        name: "Organisation",
      });
      expect(nonExternalLink).not.toHaveAttribute("target");
      expect(nonExternalLink).not.toHaveAttribute("rel");
    });

    it("includes the new-tab cue in the accessible name of external items", () => {
      renderSidenav(true);

      expect(
        screen.getByRole("link", { name: "Documentation (opens in new tab)" }),
      ).toBeVisible();
      expect(
        screen.queryByRole("link", { name: "Documentation" }),
      ).not.toBeInTheDocument();
    });

    it("shows a trailing icon on external items when open", () => {
      renderSidenav(true);

      const externalLink = screen.getByRole("link", {
        name: "Documentation (opens in new tab)",
      });
      expect(externalLink.querySelector("svg")).toBeInTheDocument();

      const nonExternalLink = screen.getByRole("link", {
        name: "Organisation",
      });
      expect(nonExternalLink.querySelector("svg")).not.toBeInTheDocument();
    });

    it("shows a badge on the icon and mentions the new tab in the tooltip when collapsed", async () => {
      renderSidenav(false);

      const icon = screen.getByTestId("navicon5");
      expect(icon.parentElement?.querySelector("svg")).toBeInTheDocument();

      const user = userEvent.setup();
      await user.hover(icon);

      const tooltip = await screen.findByRole("tooltip", {
        name: "Documentation (opens in new tab)",
      });
      expect(tooltip).toBeVisible();
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

    it("closed drawer is not visible", () => {
      renderSidenav(false);

      expect(screen.queryByText("Setup")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Setup" }),
      ).not.toBeInTheDocument();
    });

    it("open drawer is visible", () => {
      renderSidenav(true);

      expect(screen.getByText("Setup")).toBeVisible();
      expect(screen.getByTestId("navicon1")).toBeVisible();
    });

    it("clicking a nav item closes the drawer", async () => {
      const user = userEvent.setup();
      const setOpen = vi.fn();

      renderSidenav(true, setOpen);

      await user.click(screen.getByRole("link", { name: "Setup" }));

      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it("clicking backdrop closes the drawer", async () => {
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
