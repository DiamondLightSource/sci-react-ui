import { render, screen } from "@testing-library/react";
import { SecondaryNavContent, SecondaryNavGroup } from "./SecondaryNav";
import { createMemoryRouter, NavLink, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { addProviders } from "../../__test-utils__/helpers";

describe("SecondaryNavContent", () => {
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

  function renderSecondaryNavContent(
    props: Partial<ComponentProps<typeof SecondaryNavContent>> = {},
    { onOuterClick }: { onOuterClick?: () => void } = {},
  ) {
    const router = createMemoryRouter([
      {
        path: "/",
        element: (
          // The outer click handler stands in for a consumer that closes
          // itself on selection (e.g. NavigationLayout's mobile drawer) -
          // it's how these tests observe stopPropagation without depending
          // on any particular consumer's implementation.
          <div onClick={onOuterClick}>
            <SecondaryNavContent groups={groups} {...props} />
          </div>
        ),
      },
    ]);
    render(addProviders(<RouterProvider router={router} />));
  }

  it("renders grouped items with subheaders and a divider between groups", () => {
    renderSecondaryNavContent();

    expect(screen.getByText("Group one")).toBeVisible();
    expect(screen.getByText("Group two")).toBeVisible();
    expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Acquisition" })).toBeVisible();
    expect(screen.queryByRole("separator")).toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    renderSecondaryNavContent({ title: "Secondary" });
    expect(screen.getByRole("heading", { name: "Secondary" })).toBeVisible();
  });

  it("dense defaults to true, applying compact row styling", () => {
    renderSecondaryNavContent();
    expect(screen.getByRole("link", { name: "Setup" })).toHaveClass(
      "MuiListItemButton-dense",
    );
  });

  it("dense can be turned off for taller rows", () => {
    renderSecondaryNavContent({ dense: false });
    expect(screen.getByRole("link", { name: "Setup" })).not.toHaveClass(
      "MuiListItemButton-dense",
    );
  });

  it("never renders a Drawer itself - it has no responsive presentation of its own", () => {
    renderSecondaryNavContent();
    expect(document.querySelector(".MuiDrawer-root")).not.toBeInTheDocument();
  });

  it("does not render a header when no header props are provided", () => {
    renderSecondaryNavContent();
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
  });

  it("search input calls onChange and does not filter the passed-in groups itself", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderSecondaryNavContent({
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

    renderSecondaryNavContent({ onBack });

    const back = screen.getByRole("button", { name: "Back" });
    expect(back).toBeVisible();

    await user.click(back);
    expect(onBack).toHaveBeenCalled();
  });

  it("expanding an item reveals its children and toggles aria-expanded", async () => {
    const user = userEvent.setup();
    renderSecondaryNavContent();

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
    renderSecondaryNavContent();

    expect(screen.queryByText("Analysis A")).not.toBeInTheDocument();

    // Clicking the label text, not the chevron IconButton - regression test
    // for the chevron previously being nested inside the row's own button.
    await user.click(screen.getByText("Analysis"));

    expect(screen.getByText("Analysis A")).toBeVisible();
  });

  it("a row with both linkProps and children navigates and toggles together on label click", async () => {
    const user = userEvent.setup();
    renderSecondaryNavContent();

    const link = screen.getByRole("link", { name: "Expandable link" });
    expect(link).toHaveAttribute("href", "https://www.example.com");

    expect(screen.queryByText("Child")).not.toBeInTheDocument();

    await user.click(link);
    expect(screen.getByText("Child")).toBeVisible();
  });

  it("a row with both linkProps and children can also be toggled via the chevron alone", async () => {
    const user = userEvent.setup();
    renderSecondaryNavContent();

    expect(screen.queryByText("Child")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Expand Expandable link" }),
    );
    expect(screen.getByText("Child")).toBeVisible();
  });

  it("auto-expands an item that is selected or has a selected child", () => {
    renderSecondaryNavContent({
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

  // A consumer (e.g. NavigationLayout's mobile drawer) may close itself on
  // any click that bubbles out - these confirm which rows let that happen
  // and which stop it, independent of any particular consumer.
  describe("click propagation", () => {
    it("a plain link row's click bubbles up to an ancestor", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSecondaryNavContent({}, { onOuterClick });

      await user.click(screen.getByRole("link", { name: "Setup" }));

      expect(onOuterClick).toHaveBeenCalled();
    });

    it("a toggle-only row's click does not bubble up to an ancestor", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSecondaryNavContent({}, { onOuterClick });

      await user.click(screen.getByText("Analysis"));

      expect(screen.getByText("Analysis A")).toBeVisible();
      expect(onOuterClick).not.toHaveBeenCalled();
    });

    it("expanding via the chevron alone does not bubble up to an ancestor", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSecondaryNavContent({}, { onOuterClick });

      await user.click(screen.getByRole("button", { name: "Expand Analysis" }));

      expect(onOuterClick).not.toHaveBeenCalled();
    });

    it("a row that is both a link and expandable still bubbles up on click", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSecondaryNavContent({}, { onOuterClick });

      await user.click(screen.getByRole("link", { name: "Expandable link" }));

      expect(onOuterClick).toHaveBeenCalled();
    });
  });
});
