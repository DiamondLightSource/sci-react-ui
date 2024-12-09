import { render, screen, waitFor } from "@testing-library/react";
import dlsLogo from "../public/dls.svg";
import { Footer, FooterLink, FooterLinks } from "./Footer";

describe("Footer", () => {
  test("Should render blank", async () => {
    render(<Footer logo={null} />);

    await waitFor(() => {
      expect(screen.getByTestId("footer-container")).not.toBeNull();
      expect(screen.getByTestId("footer-link-container")).not.toBeNull();
      // footer container only loads empty div
      expect(
        screen.getByTestId("footer-logo-container").childElementCount
      ).toBe(1);
    });
  });

  test("Should render logo only", async () => {
    render(<Footer logo={dlsLogo} />);

    await waitFor(() => {
      expect(screen.getByRole("img")).not.toBeNull();
    });
  });

  test("Should render copyright only", async () => {
    render(<Footer logo={null} copyright="test copyright text" />);

    await waitFor(() => {
      expect(screen.getByText("test copyright text")).not.toBeNull();
    });
  });

  test("Should render logo and copyright", async () => {
    render(<Footer logo={dlsLogo} copyright="test copyright text" />);

    await waitFor(() => {
      expect(screen.getByRole("img")).not.toBeNull();
      expect(screen.getByText("test copyright text")).not.toBeNull();
    });
  });

  test("Should render with one link", async () => {
    render(
      <Footer>
        <FooterLinks>
          <FooterLink href="link-one-href">Link one</FooterLink>
        </FooterLinks>
      </Footer>
    );

    await waitFor(() => {
      const linkOneContainer = screen.getByTestId("link-container");
      expect(
        screen.getByTestId("footer-links-container").childElementCount
      ).toBe(1);
      expect(linkOneContainer).not.toBeNull();
      expect(linkOneContainer.getAttribute("href")).toStrictEqual(
        "link-one-href"
      );
      expect(linkOneContainer.textContent).toStrictEqual("Link one");
    });
  });

  test("Should render with two links", async () => {
    render(
      <Footer>
        <FooterLinks>
          <FooterLink data-testid="link-one-container" href="link-one-href">
            Link one
          </FooterLink>
          <FooterLink data-testid="link-two-container" href="link-two-href">
            Link two
          </FooterLink>
        </FooterLinks>
      </Footer>
    );

    await waitFor(() => {
      const linkTwoContainer = screen.getByTestId("link-two-container");
      expect(screen.getByTestId("footer-links-container")).not.toBeNull();
      expect(
        screen.getByTestId("footer-links-container").childElementCount
      ).toBe(2);
      expect(linkTwoContainer).not.toBeNull();
      expect(linkTwoContainer.getAttribute("href")).toStrictEqual(
        "link-two-href"
      );
      expect(linkTwoContainer.textContent).toStrictEqual("Link two");
    });
  });

  test("Should render with three links", async () => {
    render(
      <Footer>
        <FooterLinks>
          <FooterLink href="link-one-href">Link one</FooterLink>
          <FooterLink href="link-two-href">Link two</FooterLink>
          <FooterLink data-testid="link-three-container" href="link-three-href">
            Link three
          </FooterLink>
        </FooterLinks>
      </Footer>
    );

    await waitFor(() => {
      const linkThreeContainer = screen.getByTestId("link-three-container");
      expect(screen.getByTestId("footer-links-container")).not.toBeNull();
      expect(
        screen.getByTestId("footer-links-container").childElementCount
      ).toBe(3);
      expect(linkThreeContainer).not.toBeNull();
      expect(linkThreeContainer.getAttribute("href")).toStrictEqual(
        "link-three-href"
      );
      expect(linkThreeContainer.textContent).toStrictEqual("Link three");
    });
  });
});
