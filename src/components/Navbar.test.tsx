import { fireEvent, screen } from "@testing-library/react";
import { Navbar, NavLinks, NavLink } from "./Navbar";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../__test-utils__/helpers";

describe("Navbar", () => {
  it("should render", async () => {
    renderWithProviders(<Navbar />);
    expect(await screen.findByRole("banner")).toBeInTheDocument();
  });

  it("should render with styles", async () => {
    const borderStyle = "1px solid orange";
    renderWithProviders(<Navbar style={{ border: borderStyle }} />);

    const headerComputedStyle = window.getComputedStyle(
      await screen.findByRole("banner"),
    );

    // check new style is set
    expect(headerComputedStyle.border).toBe(borderStyle);

    // Check default values are still set
    expect(headerComputedStyle.height).toBe("50px");
  });
});

describe("Navbar Logo", () => {
  it("should not display logo if null", () => {
    global.innerWidth = 600;
    renderWithProviders(<Navbar logo={null} />);
    expect(screen.queryByAltText("Home")).not.toBeInTheDocument();
  });
});

describe("Navbar Links", () => {
  it("should display hamburger menu on narrow displays", () => {
    global.innerWidth = 600;
    renderWithProviders(
      <NavLinks>
        <NavLink>Proposals</NavLink>
      </NavLinks>,
    );
    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
  });

  it("should display menu items when hamburger menu is clicked", () => {
    global.innerWidth = 600;
    renderWithProviders(
      <NavLinks>
        <NavLink>Proposals</NavLink>
      </NavLinks>,
    );
    const menu = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menu);

    expect(screen.getAllByText("Proposals")).toHaveLength(2);
  });

  it("should render links properly", () => {
    global.innerWidth = 600;
    renderWithProviders(
      <NavLinks>
        <NavLink>Proposals</NavLink>
      </NavLinks>,
    );
    expect(screen.getByText("Proposals")).toBeInTheDocument();
  });
});
