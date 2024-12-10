import { render, screen, waitFor } from "@testing-library/react";
import dlsLogo from "../public/dls.svg";

import { Footer, FooterLink, FooterLinks } from "./Footer";
describe("Footer", () => {
  test("Should render blank", async () => {
    render(<Footer logo={null} />);

    await waitFor(() => {
      expect(screen.getByTestId("footer-container")).toBeInTheDocument();
      expect(screen.getByTestId("footer-link-container")).toBeInTheDocument();
      // footer container only loads empty div
      expect(
        screen.getByTestId("footer-logo-container").childElementCount
      ).toBe(1);
    });
  });

  test("Should render logo only", async () => {
    render(<Footer logo={dlsLogo} />);

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  test("Should render copyright only", async () => {
    render(<Footer logo={null} copyright="test copyright text" />);

    await waitFor(() => {
      expect(screen.getByText("test copyright text")).toBeInTheDocument();
    });
  });

  test("Should render logo and copyright", async () => {
    render(<Footer logo={dlsLogo} copyright="test copyright text" />);

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText("test copyright text")).toBeInTheDocument();
    });
  });

  test("Should render with one link", async () => {
    const linkOneName = "link-one-href";
    render(
      <Footer>
        <FooterLinks>
          <FooterLink href={linkOneName}>Link one</FooterLink>
        </FooterLinks>
      </Footer>
    );

    await waitFor(() => {
      const linkOneContainer = screen.getByTestId("link-container");
      expect(
        screen.getByTestId("footer-links-container").childElementCount
      ).toBe(1);
      expect(linkOneContainer).toBeInTheDocument();
      expect(linkOneContainer.getAttribute("href")).toStrictEqual(linkOneName);
      expect(linkOneContainer.textContent).toStrictEqual("Link one");
    });
  });

  test("Should render with two links", async () => {
    const linkOneName = "link-one-href";
    const linkTwoName = "link-two-href";
    render(
      <Footer>
        <FooterLinks>
          <FooterLink data-testid="link-one-container" href={linkOneName}>
            Link one
          </FooterLink>
          <FooterLink data-testid="link-two-container" href={linkTwoName}>
            Link two
          </FooterLink>
        </FooterLinks>
      </Footer>
    );

    await waitFor(() => {
      const linkTwoContainer = screen.getByTestId("link-two-container");
      expect(screen.getByTestId("footer-links-container")).toBeInTheDocument();
      expect(
        screen.getByTestId("footer-links-container").childElementCount
      ).toBe(2);
      expect(linkTwoContainer).toBeInTheDocument();
      expect(linkTwoContainer.getAttribute("href")).toStrictEqual(linkTwoName);
      expect(linkTwoContainer.textContent).toStrictEqual("Link two");
    });
  });
});
