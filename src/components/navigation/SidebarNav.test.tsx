import { render, screen } from "@testing-library/react";
import { Navigation, SidebarNav } from "./SidebarNav";
import { createMemoryRouter, NavLink, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
      ],
    },
  ];

  function renderSidenav(open: boolean) {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <SidebarNav navigation={navigation} open={open} />,
      },
    ]);
    render(<RouterProvider router={router} />);
  }

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
    const tooltip = await screen.findByRole("tooltip", { name: "Acquisition" });
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

  it("renders internal and external links with correct href", () => {
    // even though specified differently, ultimately both types
    // should have the correct href attribute
    renderSidenav(true);

    const externalLink = screen.getByRole("link", { name: "Organisation" });
    expect(externalLink).toHaveAttribute("href", "https://www.example.com");

    const internalLink = screen.getByRole("link", { name: "Setup" });
    expect(internalLink).toHaveAttribute("href", "/setup");
  });
});
