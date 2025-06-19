import type { ImageColorSchemeSwitchType } from "../controls/ImageColorSchemeSwitch";
jest.mock("../controls/ImageColorSchemeSwitch", () => ({
  __esModule: true,
  ImageColorSchemeSwitch: ({
    image,
  }: {
    image: ImageColorSchemeSwitchType;
  }) => (
    <img src={image.src} alt={image.alt} role="img" data-testid="mock-logo" />
  ),
}));

import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import dlsLogo from "../public/generic/logo-short.svg";
import { Footer, FooterLink, FooterLinks } from "./Footer";
import { renderWithProviders } from "../../__test-utils__/helpers";
import { MemoryRouter, Link } from "react-router-dom";

describe("Footer logo and copyright", () => {
  test("Should render", async () => {
    renderWithProviders(<Footer />);
    expect(await screen.findByRole("contentinfo")).toBeInTheDocument();
  });

  test("Should render correctly with styles", async () => {
    const borderStyle = "1px solid orange";
    renderWithProviders(<Footer style={{ border: borderStyle }} />);
    const footerComputedStyle = window.getComputedStyle(
      await screen.findByRole("contentinfo"),
    );

    // check new style is set
    expect(footerComputedStyle.border).toBe(borderStyle);

    // Check default values are still set
    expect(footerComputedStyle.minHeight).toBe("50px");
  });

  test("Should render logo only", async () => {
    renderWithProviders(<Footer logo={{ src: dlsLogo, alt: "t" }} />);
    expect(await screen.findByAltText("t")).toBeInTheDocument();
    expect(screen.queryByText(/^Copyright © \d{4}/)).not.toBeInTheDocument();
  });

  test("Should render logo via theme", async () => {
    renderWithProviders(<Footer logo="theme" />);
    expect(await screen.findByTestId("mock-logo")).toBeInTheDocument();
  });

  test("Should render copyright only", async () => {
    const copyrightText = "add text here";
    const currentYear = new Date().getFullYear();
    renderWithProviders(<Footer logo={null} copyright={copyrightText} />);
    expect(
      await screen.findByText(`Copyright © ${currentYear} ${copyrightText}`),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("Should render logo and copyright", async () => {
    const copyrightText = "add text here";
    const currentYear = new Date().getFullYear();
    renderWithProviders(
      <Footer logo={{ src: dlsLogo, alt: "logo" }} copyright={copyrightText} />,
    );
    expect(await screen.findByAltText("logo")).toBeInTheDocument();
    expect(
      screen.getByText(`Copyright © ${currentYear} ${copyrightText}`),
    ).toBeInTheDocument();
  });
});

describe("Footer Links", () => {
  test("Should render with one link", async () => {
    renderWithProviders(
      <Footer>
        <FooterLinks>
          <FooterLink href="link-one-href">Link one</FooterLink>
        </FooterLinks>
      </Footer>,
    );
    const link = await screen.findByText("Link one");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "link-one-href");
  });

  test("Should render with two links", async () => {
    renderWithProviders(
      <Footer>
        <FooterLinks>
          <FooterLink href="link-one-href">Link one</FooterLink>
          <FooterLink href="link-two-href">Link two</FooterLink>
        </FooterLinks>
      </Footer>,
    );
    const link = await screen.findByText("Link two");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "link-two-href");
  });
});

test("Should render FooterLink with linkComponent and 'to' prop", async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <Footer>
        <FooterLinks>
          <FooterLink linkComponent={Link} to="/about">
            About
          </FooterLink>
        </FooterLinks>
      </Footer>
    </MemoryRouter>,
  );

  const link = await screen.findByText("About");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/about");
});

test("Should not render a valid link when only 'to' is provided without linkComponent", () => {
  renderWithProviders(
    <Footer>
      <FooterLinks>
        <FooterLink to="/about">About</FooterLink>
      </FooterLinks>
    </Footer>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link).not.toHaveAttribute("href", "/about");
});

test("Should fall back to href when linkComponent is provided without 'to'", () => {
  renderWithProviders(
    <MemoryRouter>
      <Footer>
        <FooterLinks>
          <FooterLink linkComponent={Link} href="/about">
            About
          </FooterLink>
        </FooterLinks>
      </Footer>
    </MemoryRouter>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link).toHaveAttribute("href", "/about");
});

test("Should use href when both 'href' and 'to' are provided without linkComponent", () => {
  renderWithProviders(
    <Footer>
      <FooterLinks>
        <FooterLink href="/about" to="/somewhereElse">
          About
        </FooterLink>
      </FooterLinks>
    </Footer>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/about");
});

test("Should use 'to' when both 'href' and 'to' are provided with linkComponent", () => {
  renderWithProviders(
    <MemoryRouter>
      <Footer>
        <FooterLinks>
          <FooterLink linkComponent={Link} href="/somewhereElse" to="/about">
            About
          </FooterLink>
        </FooterLinks>
      </Footer>
    </MemoryRouter>,
  );

  const link = screen.getByText("About");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/about");
});

test("renders leftSlot", () => {
  renderWithProviders(
    <Footer leftSlot={<div data-testid="left-slot">Left Slot</div>} />,
  );
  expect(screen.getByTestId("left-slot")).toBeInTheDocument();
});

test("renders centreSlot", () => {
  renderWithProviders(
    <Footer centreSlot={<div data-testid="centre-slot">Centre Slot</div>} />,
  );
  expect(screen.getByTestId("centre-slot")).toBeInTheDocument();
});

test("renders rightSlot", () => {
  renderWithProviders(
    <Footer rightSlot={<div data-testid="right-slot">Right Slot</div>} />,
  );
  expect(screen.getByTestId("right-slot")).toBeInTheDocument();
});

test("renders all slots together", () => {
  renderWithProviders(
    <Footer
      leftSlot={<div data-testid="left-slot">Right</div>}
      centreSlot={<div data-testid="centre-slot">Centre</div>}
      rightSlot={<div data-testid="right-slot">Right Slot</div>}
    />,
  );
  expect(screen.getByTestId("left-slot")).toBeInTheDocument();
  expect(screen.getByTestId("centre-slot")).toBeInTheDocument();
  expect(screen.getByTestId("right-slot")).toBeInTheDocument();
});

describe("Footer Slot Positioning", () => {
  test("centreSlot should be centred", () => {
    renderWithProviders(
      <Footer centreSlot={<div data-testid="centre-slot">Centre</div>} />,
    );
    const centreSlot = screen.getByTestId("centre-slot");
    const parent = centreSlot.parentElement;
    expect(parent).toHaveStyle({
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    });
  });

  test("leftSlot should be aligned to the left end of the row", () => {
    renderWithProviders(
      <Footer leftSlot={<div data-testid="left-slot">Left</div>} />,
    );
    const leftSlot = screen.getByTestId("left-slot");
    const parent = leftSlot.parentElement;
    const grandparent = parent?.parentElement;
    expect(grandparent).toHaveStyle("justify-content: space-between");
    expect(parent?.firstChild).toBe(leftSlot);
    expect(grandparent?.firstChild).toBe(parent);
  });
});
