import { fireEvent, screen, render } from "@testing-library/react";
import { Navbar, NavLinks, NavLink } from "./Navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
  it("should not display logo if null", () => {
    global.innerWidth = 600;
    render(<Navbar logo={null} />);
    expect(screen.queryByAltText("Home")).not.toBeInTheDocument();
  });
});

describe("Navbar Links", () => {
  it("should display hamburger menu on narrow displays", () => {
    global.innerWidth = 600;
    render(
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
    render(
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
    render(
      <NavLinks>
        <NavLink>Proposals</NavLink>
      </NavLinks>,
    );
    expect(screen.getByText("Proposals")).toBeInTheDocument();
  });
});
