import "@testing-library/jest-dom";
import {render} from "@testing-library/react";

import {createTheme, Theme} from "@mui/material/styles";

import {ThemeProvider} from "./ThemeProvider";
import {BaseThemeOptions} from "./BaseTheme";
import {GenericTheme} from "./GenericTheme";
import {DiamondTheme} from "./DiamondTheme";


jest.mock("@mui/material/CssBaseline", () => () => {
  return <div data-testid="Mock_CssBaseline"/>;
});

const buttonText = "a test button",
   testApp = <div>
      <h1>H1</h1>
      <p>Paragraph</p>
      <button>{buttonText}</button>
      <footer>Footer</footer>
    </div>

describe("ThemeProvider Component", () => {
  
  it("should render", () => {
    render(<ThemeProvider></ThemeProvider>);
  });
  
  it("should render with button", () => {
    const {getByText} = render(<ThemeProvider>
      {testApp}
    </ThemeProvider>);
    
    expect(getByText(buttonText)).toBeInTheDocument()
  });
  
  it("should render with generic theme", () => {
    const {getByText} = render(<ThemeProvider theme={GenericTheme}>
      {testApp}
    </ThemeProvider>);
    
    expect(getByText(buttonText)).toBeInTheDocument()
  });
  
  it("should render with diamond theme", () => {
    const {getByText} = render(<ThemeProvider theme={DiamondTheme}>
      {testApp}
    </ThemeProvider>);
    
    expect(getByText(buttonText)).toBeInTheDocument()
  });
  
  
  it("should render with a new theme", () => {
    const NewTheme: Theme = createTheme({
      ...BaseThemeOptions,
    })
    const {getByText} = render(<ThemeProvider theme={NewTheme}>
      {testApp}
    </ThemeProvider>);
    
    expect(getByText(buttonText)).toBeInTheDocument()
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
  
  it("should render with app but without CssBaseline", () => {
    const {getByText} = render(<ThemeProvider baseline={false}>
      {testApp}
    </ThemeProvider>);
    
    expect(getByText(buttonText)).toBeInTheDocument()
  });
})