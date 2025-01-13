import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { createTheme, Theme } from "@mui/material/styles";

import { ThemeProvider } from "./ThemeProvider.tsx";
import { BaseThemeOptions } from "./BaseTheme.ts";
import { GenericTheme } from "./GenericTheme.ts";
import { DiamondTheme } from "./DiamondTheme.ts";
import { Button } from "@mui/material";

jest.mock("@mui/material/CssBaseline", () => {
  const MockCssBaseline = () => {
    return <div data-testid="Mock_CssBaseline" />;
  };
  MockCssBaseline.displayName = "MockCssBaseline";
  return MockCssBaseline;
});

const buttonText = "a test button",
  testApp = (
    <div>
      <h1>H1</h1>
      <p>Paragraph</p>
      <button>{buttonText}</button>
      <footer>Footer</footer>
    </div>
  );

describe("ThemeProvider Component", () => {
  it("should render", () => {
    render(<ThemeProvider></ThemeProvider>);
  });

  it("should render with button", () => {
    const { getByText } = render(<ThemeProvider>{testApp}</ThemeProvider>);

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it("should render with generic theme", () => {
    const { getByText } = render(
      <ThemeProvider theme={GenericTheme}>{testApp}</ThemeProvider>,
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it("should render with diamond theme", () => {
    const { getByText } = render(
      <ThemeProvider theme={DiamondTheme}>{testApp}</ThemeProvider>,
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it("should render with a new theme", () => {
    const NewTheme: Theme = createTheme({
      ...BaseThemeOptions,
    });
    const { getByText } = render(
      <ThemeProvider theme={NewTheme}>{testApp}</ThemeProvider>,
    );
    expect(getByText(buttonText)).toBeInTheDocument();
  });
});

describe("ThemeProvider CssBaseline Component", () => {
  it("should render with CssBaseline", () => {
    const { queryByTestId } = render(<ThemeProvider />);
    expect(queryByTestId("Mock_CssBaseline")).toBeInTheDocument();
  });

  it("should render without CssBaseline", () => {
    const { queryByTestId } = render(<ThemeProvider baseline={false} />);
    expect(queryByTestId("Mock_CssBaseline")).not.toBeInTheDocument();
  });

  it("should render with app but without CssBaseline", () => {
    const { getByText } = render(
      <ThemeProvider baseline={false}>{testApp}</ThemeProvider>,
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it("should render with button but without CssBaseline", async () => {
    const buttonText = "A button";
    const { findByText } = render(
      <ThemeProvider baseline={false}>
        <Button>{buttonText}</Button>
      </ThemeProvider>,
    );

    expect(await findByText(buttonText));
  });
});
