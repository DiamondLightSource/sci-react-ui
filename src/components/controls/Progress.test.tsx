import React from "react";

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../__test-utils__/helpers";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("should render without errors", () => {
    renderWithProviders(<Progress />);
  });

  it("should have am progressbar", () => {
    renderWithProviders(<Progress />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should have a slow speed", () => {
    renderWithProviders(<Progress speed={"slow"} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();

    const styles = window.getComputedStyle(progressbar);
    expect(styles.animationDuration).toBe("2000ms");
  });

  it("should have a large zoom", () => {
    renderWithProviders(<Progress size={"large"} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveStyle("position:absolute");

    expect(progressbar.parentElement).toBeInTheDocument();
    expect(progressbar.parentElement).toHaveStyle("position:relative");
  });
});
