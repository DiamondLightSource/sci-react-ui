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
