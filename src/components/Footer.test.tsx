import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import dlsLogo from "../public/generic/logo-short.svg";
import { Footer, FooterLink, FooterLinks } from "./Footer";
import { ImageColorSchemeSwitch } from "./ImageColorSchemeSwitch";
import { ThemeProvider } from "../themes/ThemeProvider";

jest.mock("./ImageColorSchemeSwitch");
// @ts-expect-error: doesn't find mockImplementation outside of testing.
ImageColorSchemeSwitch.mockImplementation(() => <img src="src" alt="alt" />);

describe("Footer", () => {
  test("Should render logo only", () => {
    render(<Footer logo={{ src: dlsLogo, alt: "t" }} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    // No copyright text
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  test("Should render logo via theme", () => {
    render(
      <ThemeProvider>
        <Footer logo="theme" />
      </ThemeProvider>,
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("Should render copyright only", async () => {
    const copyrightText = "add text here";
    const currentYear = new Date().getFullYear();
    render(<Footer logo={null} copyright={copyrightText} />);

    await waitFor(() => {
      expect(screen.queryByRole("paragraph")).toBeInTheDocument();
      expect(screen.queryByRole("paragraph")?.textContent).toStrictEqual(
        `Copyright © ${currentYear} ${copyrightText}`,
      );
      // No logo
      expect(screen.queryByRole("img")).not.toBeTruthy();
    });
  });

  test("Should render logo and copyright", async () => {
    const copyrightText = "add text here";
    const currentYear = new Date().getFullYear();
    render(
      <Footer logo={{ src: dlsLogo, alt: "" }} copyright={copyrightText} />,
    );

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
      const paragraph = screen.getByRole("paragraph");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.textContent).toStrictEqual(
        `Copyright © ${currentYear} ${copyrightText}`,
      );
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
      </Footer>,
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
      </Footer>,
    );

    await waitFor(() => {
      const linkTwoContainer = screen.getByText(linkTwoText);

      expect(linkTwoContainer).toBeInTheDocument();
      expect(linkTwoContainer.getAttribute("href")).toStrictEqual(linkTwoName);
      expect(linkTwoContainer.textContent).toStrictEqual(linkTwoText);
    });
  });
});
