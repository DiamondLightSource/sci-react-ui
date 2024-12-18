import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import { ColourSchemeButton } from "./ColourSchemeButton";
import { ColourSchemes } from "../utils/globals";

const mockSetColorScheme = jest.fn();
jest.mock("@mui/material", () => {
  return {
    ...jest.requireActual("@mui/material"),
    useColorScheme: jest.fn().mockReturnValue({
      colorScheme: jest.requireActual("../utils/globals").ColourSchemes.Dark,
      setColorScheme: (scheme: ColourSchemes) => mockSetColorScheme(scheme),
    }),
  };
});

describe("ColourSchemeButton", () => {
  it("should render without errors", () => {
    render(<ColourSchemeButton />);
  });

  it("should show dark icon and button", () => {
    const { getByTestId, getByRole } = render(<ColourSchemeButton />);

    const button = getByRole("button");
    expect(button).toBeInTheDocument();

    const icon = getByTestId("BedtimeIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should change colour scheme on click", () => {
    const { getByRole } = render(<ColourSchemeButton />);

    const button = getByRole("button");
    fireEvent.click(button);

    expect(mockSetColorScheme).toHaveBeenCalledWith(ColourSchemes.Light);
  });

  it("should call local onclick when button clicked", () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(<ColourSchemeButton onClick={mockOnClick} />);

    const button = getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
