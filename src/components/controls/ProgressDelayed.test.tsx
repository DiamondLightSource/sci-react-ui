import React from "react";

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../__test-utils__/helpers";
import { ProgressDelayed } from "./ProgressDelayed";
import { expect } from "@storybook/test";
import { LinearProgress } from "@mui/material";

describe("ProgressDelayed", () => {
  it("should render without errors", () => {
    renderWithProviders(<ProgressDelayed />);
  });

  it("should have am progressbar after a delay", async () => {
    renderWithProviders(<ProgressDelayed delay={300} />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
  });

  it("should have fade", async () => {
    renderWithProviders(<ProgressDelayed delay={300} fade={true} />);

    const progressbar = await screen.findByRole("progressbar");
    const progressDelay = progressbar.parentElement?.parentElement;
    expect(progressDelay).toBeInTheDocument();
    expect(progressDelay).toHaveStyle("animation:progress-delay-fade-in 400ms");
  });

  it("should not have fade", async () => {
    renderWithProviders(<ProgressDelayed delay={300} fade={false} />);

    const progressbar = await screen.findByRole("progressbar");
    const progressDelay = progressbar.parentElement?.parentElement;

    expect(progressDelay).toBeInTheDocument();
    expect(progressDelay).toHaveStyle("animation-delay:");
  });

  it("should have a different progress bar", async () => {
    renderWithProviders(
      <ProgressDelayed delay={300} progress={<LinearProgress />} />,
    );

    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
  });
});
