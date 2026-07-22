import { render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { NavigationLayout } from "./NavigationLayout";
import type { Navigation } from "./SidebarNav";
import type { SecondaryNavProps } from "./SecondaryNav";
import { createMemoryRouter, NavLink, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import useMediaQuery from "@mui/material/useMediaQuery";
import { addProviders } from "../../__test-utils__/helpers";

vi.mock("@mui/material/useMediaQuery");

const mockedUseMediaQuery = vi.mocked(useMediaQuery);

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

const secondaryNav: Omit<SecondaryNavProps, "open" | "setOpen" | "onBack"> = {
  title: "Secondary",
  groups: [
    {
      items: [
        {
          id: "detail",
          label: "Detail",
          linkProps: { component: NavLink, to: "/detail" },
        },
      ],
    },
  ],
};

function Harness({
  initialSidebarOpen = true,
  initialSecondaryNavOpen = false,
  withSecondaryNav = true,
}: {
  initialSidebarOpen?: boolean;
  initialSecondaryNavOpen?: boolean;
  withSecondaryNav?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen);
  const [secondaryNavOpen, setSecondaryNavOpen] = useState(
    initialSecondaryNavOpen,
  );

  return (
    <NavigationLayout
      navigation={navigation}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      secondaryNav={withSecondaryNav ? secondaryNav : undefined}
      secondaryNavOpen={secondaryNavOpen}
      setSecondaryNavOpen={setSecondaryNavOpen}
    >
      <div>Main content</div>
    </NavigationLayout>
  );
}

function renderHarness(props: React.ComponentProps<typeof Harness> = {}) {
  const router = createMemoryRouter([
    { path: "/", element: <Harness {...props} /> },
  ]);
  render(addProviders(<RouterProvider router={router} />));
}

describe("NavigationLayout", () => {
  describe("Desktop layout", () => {
    beforeEach(() => {
      mockedUseMediaQuery.mockReturnValue(true);
    });

    it("renders both panels simultaneously when both are open", () => {
      renderHarness({
        initialSidebarOpen: true,
        initialSecondaryNavOpen: true,
      });

      expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
      expect(screen.getByRole("heading", { name: "Secondary" })).toBeVisible();
      expect(screen.getByRole("link", { name: "Detail" })).toBeVisible();
    });

    it("renders only SidebarNav as a Drawer - the secondary panel is a plain flex sibling, not a second fixed-position Drawer", () => {
      renderHarness({
        initialSidebarOpen: true,
        initialSecondaryNavOpen: true,
      });

      expect(document.querySelectorAll(".MuiDrawer-root")).toHaveLength(1);
    });

    it("hides only the secondary panel when secondaryNavOpen is false", () => {
      renderHarness({
        initialSidebarOpen: true,
        initialSecondaryNavOpen: false,
      });

      expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
      expect(screen.queryByText("Secondary")).not.toBeVisible();
    });

    it("renders no secondary panel when secondaryNav is omitted", () => {
      renderHarness({ withSecondaryNav: false });

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
        initialSidebarOpen: true,
        initialSecondaryNavOpen: false,
      });

      expect(screen.getByText("Setup")).toBeVisible();
      expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
    });

    it("drilling into secondary nav hides the sidebar drawer", () => {
      renderHarness({
        initialSidebarOpen: true,
        initialSecondaryNavOpen: true,
      });

      expect(screen.queryByText("Setup")).not.toBeInTheDocument();
      expect(screen.getByText("Secondary")).toBeVisible();
      expect(screen.getByRole("link", { name: "Detail" })).toBeVisible();
    });

    it("the back button drills back to the sidebar", async () => {
      const user = userEvent.setup();
      renderHarness({
        initialSidebarOpen: true,
        initialSecondaryNavOpen: true,
      });

      expect(screen.queryByText("Setup")).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Back" }));

      await waitFor(() => {
        expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
      });
      expect(screen.getByText("Setup")).toBeVisible();
    });

    it("renders no secondary panel when secondaryNav is omitted", () => {
      renderHarness({ withSecondaryNav: false });

      expect(screen.getByText("Setup")).toBeVisible();
      expect(screen.queryByText("Secondary")).not.toBeInTheDocument();
    });
  });
});
