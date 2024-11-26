import {render} from "@testing-library/react";
import "@testing-library/jest-dom";

import {ThemeProvider} from "./ThemeProvider";
import {BaseTheme} from "./BaseTheme";
import {DiamondTheme} from "./DiamondTheme";
import Button from "@mui/material/Button";

jest.mock("@mui/material/CssBaseline", () => () => {
  return <div data-testid="Mock_CssBaseline"/>;
});

describe("ThemeProvider Component", () => {
  it("should render", () => {
    render(<ThemeProvider/>);
  });
  
  it("should render with button", async () => {
    const buttonText = "A button"
    const {findByText} = render(<ThemeProvider>
      <button>{buttonText}</button>
    </ThemeProvider>);
    
    expect(await findByText(buttonText))
  });
  
  it("should render with base theme", () => {
    render(<ThemeProvider theme={BaseTheme}>
      <div></div>
    </ThemeProvider>);
  });
  
  it("should render with base theme", () => {
    render(<ThemeProvider theme={DiamondTheme}>
      <div></div>
    </ThemeProvider>);
  });
})

describe("ThemeProvider CssBaseline Component", () => {
  
  it("should render with CssBaseline", () => {
    const {queryByTestId} = render(<ThemeProvider/>);
    expect(queryByTestId("Mock_CssBaseline")).toBeInTheDocument()
  });

  it("should render without CssBaseline", () => {
    const {queryByTestId} = render(<ThemeProvider baseline={false}/>);
    expect(queryByTestId("Mock_CssBaseline")).not.toBeInTheDocument()
  })
  
  it("should render with button but without CssBaseline", async () => {
    const buttonText = "A button"
    const {findByText} = render(<ThemeProvider baseline={false}>
      <Button>{buttonText}</Button>
    </ThemeProvider>);
    
    expect(await findByText(buttonText))
  });
})