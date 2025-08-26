import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../__test-utils__/helpers";
import { AppTitlebar, AppTitle } from "./AppTitlebar";

describe("AppTitlebar", () => {
  it("should render", async () => {
    renderWithProviders(<AppTitlebar />);
  });

  it("should render with title", async () => {
    const testTitle = "My Test Title";
    renderWithProviders(<AppTitlebar title={testTitle} />);
    expect(await screen.findByText(testTitle)).toBeInTheDocument();
  });
});

describe("AppTitle", () => {
  it("should render", () => {
    renderWithProviders(<AppTitle title="" />);
  });

  it("should render with title", async () => {
    const testTitle = "My Test Title";
    renderWithProviders(<AppTitle title={testTitle} />);
    expect(await screen.findByText(testTitle)).toBeInTheDocument();
  });

  it("should render with styles", async () => {
    const testColour = "rgb(10, 20, 30)";
    renderWithProviders(
      <AppTitle
        style={{ color: testColour }}
        title=""
        data-testid="test-app-title"
      />,
    );

    const appTitle = await screen.findByTestId("test-app-title");
    expect(appTitle).toBeInTheDocument();

    const headerComputedStyle = window.getComputedStyle(appTitle);
    // check new style is set
    expect(headerComputedStyle.color).toBe(testColour);
  });
});
