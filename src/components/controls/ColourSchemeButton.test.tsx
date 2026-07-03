import { fireEvent } from "@testing-library/react";
import { useColorScheme } from "@mui/material/styles";

import { ColourSchemeButton } from "./ColourSchemeButton";
import { renderWithProviders } from "../../__test-utils__/helpers";

const mockSetColorScheme = vi.fn();
vi.mock("@mui/material/styles", async () => {
  const actual = await vi.importActual<typeof import("@mui/material/styles")>(
    "@mui/material/styles",
  );

  return {
    ...actual,
    useColorScheme: vi.fn(),
  };
});

const mockUseColorScheme = vi.mocked(useColorScheme);

describe("ColourSchemeButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseColorScheme.mockReturnValue({
      mode: "dark",
      systemMode: undefined,
      setMode: mockSetColorScheme,
      colorScheme: "dark",
      allColorSchemes: ["light", "dark"],
      setColorScheme: vi.fn(),
    });
  });

  it("should render without errors", () => {
    renderWithProviders(<ColourSchemeButton />);
  });

  it("should show button and light mode icon when current mode is dark", () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <ColourSchemeButton />,
    );

    const button = getByRole("button");
    expect(button).toBeInTheDocument();

    const icon = getByTestId("LightModeIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should change colour scheme on click", () => {
    const { getByRole } = renderWithProviders(<ColourSchemeButton />);

    const button = getByRole("button");
    fireEvent.click(button);

    expect(mockSetColorScheme).toHaveBeenCalledWith("light");
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

  it("should not render while colour scheme is unresolved", () => {
    mockUseColorScheme.mockReturnValue({
      mode: undefined,
      systemMode: undefined,
      setMode: mockSetColorScheme,
      colorScheme: undefined,
      allColorSchemes: ["light", "dark"],
      setColorScheme: vi.fn(),
    });

    const { queryByRole } = renderWithProviders(<ColourSchemeButton />);

    expect(queryByRole("button")).not.toBeInTheDocument();
  });
});
