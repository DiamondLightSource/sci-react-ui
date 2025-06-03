import { fireEvent, screen } from "@testing-library/react";
import { Navbar, NavLinks, NavLink } from "./Navbar";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../__test-utils__/helpers";
import { MemoryRouter, Link } from "react-router-dom";

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

it("should render multiple links properly", () => {
  renderWithProviders(
    <NavLinks>
      <NavLink href="/first">First</NavLink>
      <NavLink href="/second">Second</NavLink>
    </NavLinks>,
  );

  expect(screen.getByText("First")).toBeInTheDocument();
  expect(screen.getByText("Second")).toBeInTheDocument();
});

it("should have correct aria-label on hamburger menu", () => {
  renderWithProviders(
    <NavLinks>
      <NavLink>Proposals</NavLink>
    </NavLinks>,
  );

  const button = screen.getByRole("button", { name: /open menu/i });
  expect(button).toHaveAttribute("aria-label", "Open Menu");
});

test("should render Navbar with linkComponent and 'to' prop", async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <Navbar>
        <NavLinks>
          <NavLink linkComponent={Link} to="/about">
            About
          </NavLink>
        </NavLinks>
      </Navbar>
    </MemoryRouter>,
  );

  const link = await screen.findByText("About");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/about");
});

it("should render logo with linkComponent and 'to' prop", () => {
  renderWithProviders(
    <MemoryRouter>
      <Navbar logo={{ src: "/logo.svg", alt: "Home" }} linkComponent={Link} />
    </MemoryRouter>,
  );
  const logoLink = screen.getByRole("link");
  expect(logoLink).toHaveAttribute("href", "/");
});

it("should render logo with correct alt text", () => {
  renderWithProviders(
    <MemoryRouter>
      <Navbar logo={{ src: "/logo.svg", alt: "Home" }} linkComponent={Link} />
    </MemoryRouter>,
  );

  const lightLogo = screen.getByTestId("image-light");
  const darkLogo = screen.getByTestId("image-dark");

  expect(lightLogo).toHaveAttribute("alt", "Home");
  expect(darkLogo).toHaveAttribute("alt", "Home");
});

it("should render NavLink without crashing when no 'to' or 'href' is provided", () => {
  renderWithProviders(
    <NavLinks>
      <NavLink>Proposal</NavLink>
    </NavLinks>,
  );

  expect(screen.getByText("Proposal")).toBeInTheDocument();
});

it("should render NavLink with href when linkComponent is not provided", () => {
  renderWithProviders(
    <Navbar>
      <NavLinks>
        <NavLink href="/docs">Docs</NavLink>
      </NavLinks>
    </Navbar>,
  );

  const link = screen.getByText("Docs");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link).toHaveAttribute("href", "/docs");
});

it("should render NavLink with linkComponent and 'to' prop", () => {
  renderWithProviders(
    <MemoryRouter>
      <Navbar>
        <NavLinks>
          <NavLink linkComponent={Link} to="/about">
            About
          </NavLink>
        </NavLinks>
      </Navbar>
    </MemoryRouter>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link).toHaveAttribute("href", "/about");
});

it("should render logo with href when linkComponent is not provided", () => {
  renderWithProviders(<Navbar logo={{ src: "/logo.svg", alt: "Home" }} />);

  const lightLogo = screen.getByTestId("image-light");
  const darkLogo = screen.getByTestId("image-dark");
  const logoLink = screen.getByRole("link");

  expect(lightLogo).toHaveAttribute("alt", "Home");
  expect(darkLogo).toHaveAttribute("alt", "Home");
  expect(logoLink).toHaveAttribute("href", "/");
});

it("should render logo with linkComponent without 'to' prop", () => {
  renderWithProviders(
    <MemoryRouter>
      <Navbar logo={{ src: "/logo.svg", alt: "Home" }} linkComponent={Link} />
    </MemoryRouter>,
  );

  const logoLink = screen.getByRole("link");
  const lightLogo = screen.getByTestId("image-light");
  const darkLogo = screen.getByTestId("image-dark");

  expect(lightLogo).toHaveAttribute("alt", "Home");
  expect(darkLogo).toHaveAttribute("alt", "Home");
  expect(logoLink).toHaveAttribute("href", "/");
});

it("should not render a valid link when only 'to' is provided without linkComponent", () => {
  renderWithProviders(
    <Navbar>
      <NavLinks>
        <NavLink to="/about">About</NavLink>
      </NavLinks>
    </Navbar>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link).not.toHaveAttribute("href", "/about");
});

it("should not use linkComponent without 'to'", () => {
  renderWithProviders(
    <MemoryRouter>
      <Navbar>
        <NavLinks>
          <NavLink linkComponent={Link} href="/about">
            About
          </NavLink>
        </NavLinks>
      </Navbar>
    </MemoryRouter>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link).toHaveAttribute("href", "/about");
});

it("should use 'href' when both 'href' and 'to' are provided without linkComponent", () => {
  renderWithProviders(
    <Navbar>
      <NavLinks>
        <NavLink href="/about" to="/somewhereElse">
          About
        </NavLink>
      </NavLinks>
    </Navbar>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/about");
});

it("should use 'to' when both 'href' and 'to' are provided with linkComponent", () => {
  renderWithProviders(
    <MemoryRouter>
      <Navbar>
        <NavLinks>
          <NavLink linkComponent={Link} href="/somewhereElse" to="/about">
            About
          </NavLink>
        </NavLinks>
      </Navbar>
    </MemoryRouter>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/about");
});

it("renders leftSlot", () => {
  renderWithProviders(
    <Navbar leftSlot={<div data-testid="left-slot">Right Slot</div>} />,
  );
  expect(screen.getByTestId("left-slot")).toBeInTheDocument();
});

it("renders centreSlot", () => {
  renderWithProviders(
    <Navbar centreSlot={<div data-testid="centre-slot">Centre Slot</div>} />,
  );
  expect(screen.getByTestId("centre-slot")).toBeInTheDocument();
});

it("renders rightSlot", () => {
  renderWithProviders(
    <Navbar rightSlot={<div data-testid="right-slot">Right Slot</div>} />,
  );
  expect(screen.getByTestId("right-slot")).toBeInTheDocument();
});

it("renders all slots together", () => {
  renderWithProviders(
    <Navbar
      leftSlot={<div data-testid="left-slot">Right</div>}
      centreSlot={<div data-testid="centre-slot">Centre</div>}
      rightSlot={<div data-testid="right-slot">Right Slot</div>}
    />,
  );
  expect(screen.getByTestId("left-slot")).toBeInTheDocument();
  expect(screen.getByTestId("centre-slot")).toBeInTheDocument();
  expect(screen.getByTestId("right-slot")).toBeInTheDocument();
});
describe("Navbar Slot Positioning", () => {
  it("centreSlot should be centred", () => {
    renderWithProviders(
      <Navbar centreSlot={<div data-testid="centre-slot">Centre</div>} />,
    );
    const centreSlot = screen.getByTestId("centre-slot");
    const parent = centreSlot.parentElement;
    expect(parent).toHaveStyle({
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    });
  });

  it("rightSlot should be aligned to the end of the row", () => {
    renderWithProviders(
      <Navbar rightSlot={<div data-testid="right-slot">Right</div>} />,
    );
    const rightSlot = screen.getByTestId("right-slot");
    const stack = rightSlot.closest(".MuiStack-root");
    expect(stack).toHaveStyle("justify-content: space-between");
  });

  it("logo should be vertically centred", () => {
    renderWithProviders(
      <Navbar
        logo={{ src: "/logo.svg", alt: "Home" }}
        leftSlot={<div data-testid="left-slot">Left</div>}
      />,
    );
    const logo = screen.getByRole("link");
    const logoBox = logo.parentElement;
    expect(logoBox).toHaveStyle("display: flex");
    expect(logoBox).toHaveStyle("align-items: center");
  });
});
