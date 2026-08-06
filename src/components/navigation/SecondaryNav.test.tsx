import { render, screen } from "@testing-library/react";
import { SecondaryNav, SecondaryNavGroup } from "./SecondaryNav";
import { createMemoryRouter, NavLink, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ComponentProps } from "react";
import { addProviders } from "../../__test-utils__/helpers";

vi.mock("@mui/material/useMediaQuery");

const mockedUseMediaQuery = vi.mocked(useMediaQuery);

describe("SecondaryNav", () => {
  const groups: SecondaryNavGroup[] = [
    {
      subheader: "Group one",
      items: [
        {
          id: "setup",
          label: "Setup",
          linkProps: { component: NavLink, to: "/setup" },
        },
        {
          id: "acquisition",
          label: "Acquisition",
          linkProps: { component: NavLink, to: "/acq" },
        },
      ],
    },
    {
      subheader: "Group two",
      items: [
        {
          id: "analysis",
          label: "Analysis",
          children: [
            { id: "analysis-a", label: "Analysis A" },
            { id: "analysis-b", label: "Analysis B" },
          ],
        },
        {
          id: "expandable-link",
          label: "Expandable link",
          linkProps: { href: "https://www.example.com" },
          children: [{ id: "expandable-link-child", label: "Child" }],
        },
      ],
    },
  ];

  function renderSecondaryNav(
    props: Partial<ComponentProps<typeof SecondaryNav>> = {},
  ) {
    const setOpen = props.setOpen ?? vi.fn();
    const router = createMemoryRouter([
      {
        path: "/",
        element: (
          <SecondaryNav
            groups={groups}
            open={true}
            setOpen={setOpen}
            {...props}
          />
        ),
      },
    ]);
    render(addProviders(<RouterProvider router={router} />));
    return { setOpen };
  }

  describe("Desktop layout", () => {
    beforeEach(() => {
      mockedUseMediaQuery.mockReturnValue(true);
    });

    it("renders grouped items with subheaders and a divider between groups", () => {
      renderSecondaryNav();

      expect(screen.getByText("Group one")).toBeVisible();
      expect(screen.getByText("Group two")).toBeVisible();
      expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
      expect(screen.getByRole("link", { name: "Acquisition" })).toBeVisible();
      expect(screen.queryByRole("separator")).toBeInTheDocument();
    });

    it("renders a title when provided", () => {
      renderSecondaryNav({ title: "Secondary" });
      expect(screen.getByRole("heading", { name: "Secondary" })).toBeVisible();
    });

    it("dense defaults to true, applying compact row styling", () => {
      renderSecondaryNav();
      expect(screen.getByRole("link", { name: "Setup" })).toHaveClass(
        "MuiListItemButton-dense",
      );
    });

    it("dense can be turned off for taller rows", () => {
      renderSecondaryNav({ dense: false });
      expect(screen.getByRole("link", { name: "Setup" })).not.toHaveClass(
        "MuiListItemButton-dense",
      );
    });

    it("does not use a fixed-position Drawer on desktop (would overlap a sibling panel)", () => {
      renderSecondaryNav();
      expect(document.querySelector(".MuiDrawer-root")).not.toBeInTheDocument();
    });

    it("does not render a header when no header props are provided", () => {
      renderSecondaryNav();
      expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Back" }),
      ).not.toBeInTheDocument();
    });

    it("search input calls onChange and does not filter the passed-in groups itself", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      renderSecondaryNav({
        search: { value: "", onChange, placeholder: "Search" },
      });

      const input = screen.getByPlaceholderText("Search");
      await user.type(input, "a");

      expect(onChange).toHaveBeenCalledWith("a");
      // groups are rendered unfiltered regardless of search value
      expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
    });

    it("renders a back button only when onBack is provided", async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();

      renderSecondaryNav({ onBack });

      const back = screen.getByRole("button", { name: "Back" });
      expect(back).toBeVisible();

      await user.click(back);
      expect(onBack).toHaveBeenCalled();
    });

    it("expanding an item reveals its children and toggles aria-expanded", async () => {
      const user = userEvent.setup();
      renderSecondaryNav();

      expect(screen.queryByText("Analysis A")).not.toBeInTheDocument();

      const expandButton = screen.getByRole("button", {
        name: "Expand Analysis",
      });
      expect(expandButton).toHaveAttribute("aria-expanded", "false");

      await user.click(expandButton);

      expect(screen.getByText("Analysis A")).toBeVisible();
      expect(
        screen.getByRole("button", { name: "Collapse Analysis" }),
      ).toHaveAttribute("aria-expanded", "true");
    });

    it("clicking the row itself (not just the chevron) toggles a toggle-only item", async () => {
      const user = userEvent.setup();
      renderSecondaryNav();

      expect(screen.queryByText("Analysis A")).not.toBeInTheDocument();

      // Clicking the label text, not the chevron IconButton - regression test
      // for the chevron previously being nested inside the row's own button.
      await user.click(screen.getByText("Analysis"));

      expect(screen.getByText("Analysis A")).toBeVisible();
    });

    it("a row with both linkProps and children navigates and toggles together on label click", async () => {
      const user = userEvent.setup();
      renderSecondaryNav();

      const link = screen.getByRole("link", { name: "Expandable link" });
      expect(link).toHaveAttribute("href", "https://www.example.com");

      expect(screen.queryByText("Child")).not.toBeInTheDocument();

      await user.click(link);
      expect(screen.getByText("Child")).toBeVisible();
    });

    it("a row with both linkProps and children can also be toggled via the chevron alone", async () => {
      const user = userEvent.setup();
      renderSecondaryNav();

      expect(screen.queryByText("Child")).not.toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: "Expand Expandable link" }),
      );
      expect(screen.getByText("Child")).toBeVisible();
    });

    it("auto-expands an item that is selected or has a selected child", () => {
      renderSecondaryNav({
        groups: [
          {
            items: [
              {
                id: "analysis",
                label: "Analysis",
                children: [
                  { id: "analysis-a", label: "Analysis A", selected: true },
                ],
              },
            ],
          },
        ],
      });

      expect(screen.getByText("Analysis A")).toBeVisible();
    });
  });

  describe("Mobile layout", () => {
    beforeEach(() => {
      mockedUseMediaQuery.mockReturnValue(false);
    });

    it("renders temporary drawer with visible content when open", () => {
      renderSecondaryNav({ open: true });

      expect(document.querySelector(".MuiDrawer-root")).toBeInTheDocument();
      expect(screen.getByText("Setup")).toBeVisible();
    });

    it("closed drawer is not visible", () => {
      renderSecondaryNav({ open: false });
      expect(screen.queryByText("Setup")).not.toBeInTheDocument();
    });

    it("clicking a nav item closes the drawer", async () => {
      const user = userEvent.setup();
      const { setOpen } = renderSecondaryNav({ setOpen: vi.fn() });

      await user.click(screen.getByRole("link", { name: "Setup" }));

      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it("clicking backdrop closes the drawer", async () => {
      const user = userEvent.setup();
      const { setOpen } = renderSecondaryNav({ setOpen: vi.fn() });

      const backdrop = document.querySelector(".MuiBackdrop-root");
      expect(backdrop).toBeInTheDocument();

      await user.click(backdrop!);

      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it("expanding a toggle-only item does not close the drawer", async () => {
      const user = userEvent.setup();
      const { setOpen } = renderSecondaryNav({ setOpen: vi.fn() });

      await user.click(screen.getByRole("button", { name: "Expand Analysis" }));

      expect(screen.getByText("Analysis A")).toBeVisible();
      expect(setOpen).not.toHaveBeenCalled();
    });

    it("clicking a row that is both a link and expandable still closes the drawer", async () => {
      const user = userEvent.setup();
      const { setOpen } = renderSecondaryNav({ setOpen: vi.fn() });

      await user.click(screen.getByRole("link", { name: "Expandable link" }));

      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });
});
