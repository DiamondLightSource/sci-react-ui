import React from "react";

import { screen } from "@testing-library/react";
import { createTheme, Theme } from "@mui/material/styles";

import { renderWithProviders } from "../../__test-utils__/helpers";
import { BaseThemeOptions } from "../../themes/BaseTheme";

import { Logo } from "./Logo";

describe("Logo", () => {
  const src = "a/test/src";
  const srcDark = "a/test/srcDark";
  const TestTheme: Theme = createTheme({
    ...BaseThemeOptions,
    logos: {
      normal: {
        src,
        srcDark,
        alt: "alt",
      },
      short: {
        src: src + "/short",
        alt: "alt",
      },
    },
  });

  function render(logo: React.ReactNode) {
    renderWithProviders(logo, { theme: TestTheme });
  }

  it("should render without errors", () => {
    render(<Logo />);
  });

  it("should have am img", () => {
    render(<Logo />);
    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", src);
  });

  it("should have an img when short", () => {
    render(<Logo short={true} />);

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", src + "/short");
  });

  it("should have a margin", () => {
    render(<Logo style={{ margin: "10px" }} />);

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("style", "margin: 10px;");
  });

  it("should use dark logo when fixedTone='dark'", () => {
    render(<Logo fixedTone="dark" />);
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", srcDark);
  });

  it("should use light logo when fixedTone='light'", () => {
    render(<Logo fixedTone="light" />);
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", src);
  });

  it("should fall back to default behaviour when fixedTone is undefined", () => {
    render(<Logo fixedTone={undefined} />);
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", src);
  });

  it("should be dark when tone='inverse' in light mode", () => {
    render(<Logo tone="inverse" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", srcDark);
  });

  it("should prioritise fixedTone over tone", () => {
    render(<Logo fixedTone="light" tone="inverse" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", src);
  });
});
