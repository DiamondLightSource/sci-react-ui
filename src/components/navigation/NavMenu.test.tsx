import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "../../__test-utils__/helpers";
import { NavMenu, NavMenuLink } from "./NavMenu";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
const user = userEvent.setup();

describe("NavMenu", () => {
  it("should render with a label", () => {
    renderWithProviders(<NavMenu label="Navmenu" />);
    expect(screen.getByText("Navmenu")).toBeInTheDocument();
  });

  it("should open when clicked", async () => {
    renderWithProviders(
      <NavMenu label="Navmenu">
        <NavMenuLink href="#test">Link 1</NavMenuLink>
        <NavMenuLink href="#test2">Link 2</NavMenuLink>
      </NavMenu>,
    );

    expect(screen.queryByText("Link 1")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Link 1")).toBeVisible();
    expect(screen.getByText("Link 2")).toBeVisible();
  });

  it("should open when selected using keyboard", async () => {
    renderWithProviders(
      <NavMenu label="Navmenu">
        <NavMenuLink href="">Link 1</NavMenuLink>
      </NavMenu>,
    );

    expect(screen.queryByText("Link 1")).not.toBeInTheDocument();
    await user.keyboard("[Tab][Enter]");
    expect(screen.getByText("Link 1")).toBeVisible();
  });

  it("should be possible to access the contents using the keyboard", async () => {
    renderWithProviders(
      <NavMenu label="Navmenu">
        <NavMenuLink href="">Link 1</NavMenuLink>
        <NavMenuLink href="">Link 2</NavMenuLink>
      </NavMenu>,
    );

    await user.keyboard("[Tab][Enter][ArrowDown]");
    const link1 = screen.getByRole("menuitem", { name: "Link 1" });
    expect(document.activeElement).toBe(link1);
    await user.keyboard("[ArrowDown]");
    const link2 = screen.getByRole("menuitem", { name: "Link 2" });
    expect(document.activeElement).toBe(link2);
  });
});

describe("NavMenuLink", () => {
  it("should function as a link", () => {
    renderWithProviders(<NavMenuLink href="/test">Link</NavMenuLink>);
    expect(screen.getByRole("menuitem")).toHaveAttribute("href", "/test");
  });

  it("should accept router link props", () => {
    renderWithProviders(
      <MemoryRouter>
        <NavMenuLink to="/test" linkComponent={Link}>
          Link
        </NavMenuLink>
      </MemoryRouter>,
    );
    expect(screen.getByRole("menuitem")).toHaveAttribute("href", "/test");
  });

  it("should use routing when clicked", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <NavMenuLink to="/test" linkComponent={Link}>
                Link
              </NavMenuLink>
            }
          />
          <Route path="/test" element={<p>Second page</p>} />
        </Routes>
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("menuitem"));
    expect(screen.getByText("Second page")).toBeInTheDocument();
  });

  it("should use routing on enter key press", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <NavMenuLink to="/test" linkComponent={Link}>
                Link
              </NavMenuLink>
            }
          />
          <Route path="/test" element={<p>Second page</p>} />
        </Routes>
      </MemoryRouter>,
    );
    const link = screen.getByRole("menuitem");
    link.focus();
    await user.keyboard("[enter]");
    expect(screen.getByText("Second page")).toBeInTheDocument();
  });
});
