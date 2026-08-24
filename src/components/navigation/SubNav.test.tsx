import { render, screen } from "@testing-library/react";
import { TextField } from "@mui/material";
import { SubNavContent, SubNavGroup } from "./SubNav";
import { createMemoryRouter, NavLink, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { addProviders } from "../../__test-utils__/helpers";

describe("SubNavContent", () => {
  const groups: SubNavGroup[] = [
    {
      subheader: "Group one",
      items: [
        {
          label: "Setup",
          linkProps: { component: NavLink, to: "/setup" },
        },
        {
          label: "Acquisition",
          linkProps: { component: NavLink, to: "/acq" },
        },
      ],
    },
    {
      subheader: "Group two",
      items: [
        {
          label: "Analysis",
          children: [{ label: "Analysis A" }, { label: "Analysis B" }],
        },
        {
          label: "Expandable link",
          linkProps: { href: "https://www.example.com" },
          children: [{ label: "Child" }],
        },
      ],
    },
  ];

  function renderSubNavContent(
    props: Partial<ComponentProps<typeof SubNavContent>> = {},
    { onOuterClick }: { onOuterClick?: () => void } = {},
  ) {
    const router = createMemoryRouter([
      {
        path: "/",
        element: (
          // The outer click handler stands in for a consumer that closes
          // itself on selection (e.g. SidebarNav's mobile drawer) - it's how
          // these tests observe stopPropagation without depending on any
          // particular consumer's implementation.
          <div onClick={onOuterClick}>
            <SubNavContent groups={groups} {...props} />
          </div>
        ),
      },
    ]);
    render(addProviders(<RouterProvider router={router} />));
  }

  it("renders grouped items with subheaders and a divider between groups", () => {
    renderSubNavContent();

    expect(screen.getByText("Group one")).toBeVisible();
    expect(screen.getByText("Group two")).toBeVisible();
    expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Acquisition" })).toBeVisible();
    expect(screen.queryByRole("separator")).toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    renderSubNavContent({ title: "Secondary" });
    expect(screen.getByRole("heading", { name: "Secondary" })).toBeVisible();
  });

  it("applies compact row styling by default, since dense defaults to true", () => {
    renderSubNavContent();
    expect(screen.getByRole("link", { name: "Setup" })).toHaveClass(
      "MuiListItemButton-dense",
    );
  });

  it("renders taller rows when dense is turned off", () => {
    renderSubNavContent({ dense: false });
    expect(screen.getByRole("link", { name: "Setup" })).not.toHaveClass(
      "MuiListItemButton-dense",
    );
  });

  it("does not render a header when no header props are provided", () => {
    renderSubNavContent();
    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders whatever is passed as searchSlot, with no search logic of its own", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderSubNavContent({
      searchSlot: (
        <TextField
          size="small"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
        />
      ),
    });

    const input = screen.getByPlaceholderText("Search");
    await user.type(input, "a");

    expect(onChange).toHaveBeenCalledWith("a");
    // groups are rendered unfiltered - filtering on the slot's value, if
    // any, is entirely up to the consumer.
    expect(screen.getByRole("link", { name: "Setup" })).toBeVisible();
  });

  it("renders a back button when onBack is provided", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    renderSubNavContent({ onBack });

    const back = screen.getByRole("button", { name: "Back" });
    expect(back).toBeVisible();

    await user.click(back);
    expect(onBack).toHaveBeenCalled();
  });

  it("does not render a back button when onBack is not provided", () => {
    renderSubNavContent({ title: "Secondary" });

    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
  });

  it("reveals an item's children and toggles aria-expanded when expanded", async () => {
    const user = userEvent.setup();
    renderSubNavContent();

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

  it("toggles a toggle-only item when clicking the row itself, not just the chevron", async () => {
    const user = userEvent.setup();
    renderSubNavContent();

    expect(screen.queryByText("Analysis A")).not.toBeInTheDocument();

    // Clicking the label text, not the chevron IconButton - regression test
    // for the chevron previously being nested inside the row's own button.
    await user.click(screen.getByText("Analysis"));

    expect(screen.getByText("Analysis A")).toBeVisible();
  });

  it("navigates and toggles together on label click when a row has both a link and children", async () => {
    const user = userEvent.setup();
    renderSubNavContent();

    const link = screen.getByRole("link", { name: "Expandable link" });
    expect(link).toHaveAttribute("href", "https://www.example.com");

    expect(screen.queryByText("Child")).not.toBeInTheDocument();

    await user.click(link);
    expect(screen.getByText("Child")).toBeVisible();
  });

  it("also toggles via the chevron alone when a row has both a link and children", async () => {
    const user = userEvent.setup();
    renderSubNavContent();

    expect(screen.queryByText("Child")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Expand Expandable link" }),
    );
    expect(screen.getByText("Child")).toBeVisible();
  });

  it("auto-expands an item that is selected or has a selected child", () => {
    renderSubNavContent({
      groups: [
        {
          items: [
            {
              label: "Analysis",
              children: [{ label: "Analysis A", selected: true }],
            },
          ],
        },
      ],
    });

    expect(screen.getByText("Analysis A")).toBeVisible();
  });

  // A consumer (e.g. SidebarNav's mobile drawer) may close itself on any
  // click that bubbles out - these confirm which rows let that happen and
  // which stop it, independent of any particular consumer.
  describe("click propagation", () => {
    it("lets a plain link row's click bubble up to an ancestor", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSubNavContent({}, { onOuterClick });

      await user.click(screen.getByRole("link", { name: "Setup" }));

      expect(onOuterClick).toHaveBeenCalled();
    });

    it("stops a toggle-only row's click from bubbling up to an ancestor", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSubNavContent({}, { onOuterClick });

      await user.click(screen.getByText("Analysis"));

      expect(screen.getByText("Analysis A")).toBeVisible();
      expect(onOuterClick).not.toHaveBeenCalled();
    });

    it("stops a chevron-only expand click from bubbling up to an ancestor", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSubNavContent({}, { onOuterClick });

      await user.click(screen.getByRole("button", { name: "Expand Analysis" }));

      expect(onOuterClick).not.toHaveBeenCalled();
    });

    it("still bubbles up a click on a row that is both a link and expandable", async () => {
      const user = userEvent.setup();
      const onOuterClick = vi.fn();
      renderSubNavContent({}, { onOuterClick });

      await user.click(screen.getByRole("link", { name: "Expandable link" }));

      expect(onOuterClick).toHaveBeenCalled();
    });
  });
});
