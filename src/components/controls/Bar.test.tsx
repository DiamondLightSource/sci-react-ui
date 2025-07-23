import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../__test-utils__/helpers";
import { Bar } from "./Bar";

describe("Bar", () => {
  it("should render", async () => {
    renderWithProviders(<Bar />);
    expect(await screen.findByTitle("left-slot")).toBeInTheDocument();
    expect(await screen.findByTitle("centre-slot")).toBeInTheDocument();
    expect(await screen.findByTitle("right-slot")).toBeInTheDocument();
  });

  it("should render with slots filled", async () => {
    renderWithProviders(
      <Bar
        leftSlot={<div data-testid="test-left-slot">Left</div>}
        centreSlot={<div data-testid="test-centre-slot">Centre</div>}
        rightSlot={<div data-testid="test-right-slot">Right</div>}
      />,
    );
    expect(await screen.findByTestId("test-left-slot")).toBeInTheDocument();
    expect(await screen.findByTestId("test-centre-slot")).toBeInTheDocument();
    expect(await screen.findByTestId("test-right-slot")).toBeInTheDocument();
  });

  it("should render with styles", async () => {
    const borderStyle = "1px solid orange";
    renderWithProviders(
      <Bar data-testid="test-bar" style={{ border: borderStyle }} />,
    );

    const bar = await screen.findByTestId("test-bar");
    expect(bar).toBeInTheDocument();

    const headerComputedStyle = window.getComputedStyle(bar);
    // check new style is set
    expect(headerComputedStyle.border).toBe(borderStyle);
    // Check default values are still set
    expect(headerComputedStyle.height).toBe("100%");
  });
});

describe("Bar slots", () => {
  test("renders each slot", () => {
    renderWithProviders(
      <Bar
        leftSlot={<div data-testid="left-slot">Right</div>}
        centreSlot={<div data-testid="centre-slot">Centre</div>}
        rightSlot={<div data-testid="right-slot">Right Slot</div>}
      />,
    );
    expect(screen.getByTestId("left-slot")).toBeInTheDocument();
    expect(screen.getByTestId("centre-slot")).toBeInTheDocument();
    expect(screen.getByTestId("right-slot")).toBeInTheDocument();
  });
});

describe("Bar slots ordering", () => {
  const one = "one",
    two = "two",
    three = "three";
  test("Order is left, centre, right", async () => {
    renderWithProviders(
      <Bar
        data-testid="test-bar"
        leftSlot={<div data-testid="left-slot">{one}</div>}
        centreSlot={<div data-testid="centre-slot">{two}</div>}
        rightSlot={<div data-testid="right-slot">{three}</div>}
      />,
    );
    const bar = await screen.findByTestId("test-bar");
    expect(bar).toHaveTextContent(one + two + three);
  });
});

describe("Bar Slot Positioning", () => {
  it("centreSlot should be centred", () => {
    renderWithProviders(
      <Bar centreSlot={<div data-testid="centre-slot">Centre</div>} />,
    );
    const centreSlot = screen.getByTestId("centre-slot");
    expect(centreSlot.parentElement).toBeInTheDocument();

    // @ts-expect-error centreSlot.parentElement exists.
    expect(centreSlot.parentElement.parentElement).toHaveStyle({
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    });
  });

  it("rightSlot should be aligned to the end of the row", () => {
    renderWithProviders(<Bar />);

    const rightSlot = screen.getByTitle("right-slot");
    const stack = rightSlot.parentElement;

    expect(stack).toHaveStyle({
      justifyContent: "space-between",
    });
  });
});
