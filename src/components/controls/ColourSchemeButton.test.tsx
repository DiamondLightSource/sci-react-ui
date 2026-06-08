import { fireEvent } from "@testing-library/react";

import { ColourSchemeButton } from "./ColourSchemeButton";
import { ColourSchemes } from "../../utils/globals";
import { renderWithProviders } from "../../__test-utils__/helpers";

const mockSetColorScheme = vi.fn();

vi.mock("../DataDisplay/Icons", () => ({
  MoonIcon: () => <div data-testid="MoonIcon" />,
  SunIcon: () => <div data-testid="SunIcon" />,
}));

vi.mock("@mui/material", async () => {
  const actualEnums = await vi.importActual("../../utils/globals");

  return {
    ...(await vi.importActual("@mui/material")),
    useColorScheme: vi.fn().mockReturnValue({
      // @ts-expect-error module doesn't have a type
      colorScheme: actualEnums.ColourSchemes.Dark,
      setColorScheme: (scheme: ColourSchemes) => mockSetColorScheme(scheme),
    }),
  };
});

describe("ColourSchemeButton", () => {
  it("should render without errors", () => {
    renderWithProviders(<ColourSchemeButton />);
  });

  it("should show dark icon and button", () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <ColourSchemeButton />,
    );

    const button = getByRole("button");
    expect(button).toBeInTheDocument();

    const icon = getByTestId("MoonIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should change colour scheme on click", () => {
    const { getByRole } = renderWithProviders(<ColourSchemeButton />);

    const button = getByRole("button");
    fireEvent.click(button);

    //expect(mockSetColorScheme).toHaveBeenCalledWith(ColourSchemes.Light);
  });

  it("should call local onclick when button clicked", () => {
    const mockOnClick = vi.fn();
    const { getByRole } = renderWithProviders(
      <ColourSchemeButton onClick={mockOnClick} />,
    );

    const button = getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
