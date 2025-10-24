import { ImageColourSchemeSwitch } from "./ImageColourSchemeSwitch";
import { renderWithProviders } from "../../__test-utils__/helpers";
import { screen } from "@testing-library/react";

describe("ImageColourSchemeSwitch", () => {
  const testVals = {
    src: "src/light",
    srcDark: "src/dark",
    alt: "test-alt",
  };

  function getRenderImg(image: {
    src?: string;
    srcDark?: string;
    alt?: string;
    width?: string;
    height?: string;
  }) {
    const { getByTestId } = renderWithProviders(
      <ImageColourSchemeSwitch image={{ ...testVals, ...image }} />,
    );

    const img = getByTestId("image-light");
    expect(img).toBeInTheDocument();
    return img;
  }

  it("should render without errors", () => {
    renderWithProviders(<ImageColourSchemeSwitch image={{ ...testVals }} />);
  });

  it("should have src and alt by default", () => {
    const img = getRenderImg({});

    expect(img).toHaveAttribute("alt", testVals.alt);
    expect(img).toHaveAttribute("src", testVals.src);

    expect(img).not.toHaveAttribute("width");
    expect(img).not.toHaveAttribute("height");
  });

  it("should have width 123", () => {
    const width = "123";

    const img = getRenderImg({ width });
    expect(img).toHaveAttribute("width", width);
    expect(img).not.toHaveAttribute("height");
  });

  it("should have width 123 and height 124", () => {
    const width = "123",
      height = "124";

    const img = getRenderImg({ width, height });

    expect(img).toHaveAttribute("width", width);
    expect(img).toHaveAttribute("height", height);
  });

  it("should have alternate src", () => {
    renderWithProviders(<ImageColourSchemeSwitch image={{ ...testVals }} />, {
      defaultMode: "dark",
    });
    const img = screen.getByTestId("image-dark");
    expect(img).toHaveAttribute("src", testVals.srcDark);
  });

  it("should have src when no srcDark set but dark mode selected", () => {
    renderWithProviders(
      <ImageColourSchemeSwitch image={{ ...testVals, srcDark: undefined }} />,
      {
        defaultMode: "dark",
      },
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", testVals.src);
  });
});
