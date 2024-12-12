import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import dlsLogo from "../public/dls.svg";

import { Footer, FooterLink, FooterLinks } from "./Footer";
describe("Footer", () => {
  test("Should render logo only", async () => {
    render(<Footer logo={dlsLogo} />);

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
      // No copyright text
      expect(screen.queryByRole("paragraph")).not.toBeTruthy();
    });
  });

  test("Should render copyright only", async () => {
    render(<Footer logo={null} copyright="test copyright text" />);

    await waitFor(() => {
      expect(screen.getByText("test copyright text 2024")).toBeInTheDocument();
      // No logo
      expect(screen.queryByRole("img")).not.toBeTruthy();
    });
  });

  test("Should render logo and copyright", async () => {
    render(<Footer logo={dlsLogo} copyright="test copyright text" />);

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText("test copyright text 2024")).toBeInTheDocument();
    });
  });

  test("Should render with one link", async () => {
    const lineOneText = "Link one";
    const linkOneName = "link-one-href";

    render(
      <Footer>
        <FooterLinks>
          <FooterLink href={linkOneName}>{lineOneText}</FooterLink>
        </FooterLinks>
      </Footer>
    );

    await waitFor(() => {
      const linkOneContainer = screen.getByText(lineOneText);

      expect(linkOneContainer).toBeInTheDocument();
      expect(linkOneContainer.getAttribute("href")).toStrictEqual(linkOneName);
      expect(linkOneContainer.textContent).toStrictEqual(lineOneText);
    });
  });

  test("Should render with two links", async () => {
    const linkOneText = "Link one";
    const linkTwoText = "Link two";
    const linkOneName = "link-one-href";
    const linkTwoName = "link-two-href";
    render(
      <Footer>
        <FooterLinks>
          <FooterLink href={linkOneName}>{linkOneText}</FooterLink>
          <FooterLink href={linkTwoName}>{linkTwoText}</FooterLink>
        </FooterLinks>
      </Footer>
    );

    await waitFor(() => {
      const linkTwoContainer = screen.getByText(linkTwoText);

      expect(linkTwoContainer).toBeInTheDocument();
      expect(linkTwoContainer.getAttribute("href")).toStrictEqual(linkTwoName);
      expect(linkTwoContainer.textContent).toStrictEqual(linkTwoText);
    });
  });
});
