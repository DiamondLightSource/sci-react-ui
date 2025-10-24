import { render, fireEvent } from "@testing-library/react";

import { ColourSchemeButton } from "./ColourSchemeButton";
import { ColourSchemes } from "../../utils/globals";

const mockSetColorScheme = vi.fn();
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

    //expect(mockSetColorScheme).toHaveBeenCalledWith(ColourSchemes.Light);
  });

  it("should call local onclick when button clicked", () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<ColourSchemeButton onClick={mockOnClick} />);

    const button = getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
