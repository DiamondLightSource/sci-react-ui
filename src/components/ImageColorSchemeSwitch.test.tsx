import "@testing-library/jest-dom";

import { ImageColorSchemeSwitch } from "./ImageColorSchemeSwitch";
import { renderWithProviders } from "../__test-utils__/helpers";
import { screen } from "@testing-library/react";

describe("ImageColorSchemeSwitch", () => {
  const testVals = {
    src: "src/light",
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
      <ImageColorSchemeSwitch image={{ ...testVals, ...image }} />,
    );

    const img = getByTestId("image-light");
    expect(img).toBeInTheDocument();
    return img;
  }

  it("should render without errors", () => {
    renderWithProviders(<ImageColorSchemeSwitch image={{ ...testVals }} />);
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
    const srcDark = "src/dark";

    renderWithProviders(
      <ImageColorSchemeSwitch image={{ ...testVals, srcDark }} />,
      { defaultMode: "dark" },
    );
    const img = screen.getByTestId("image-dark");

    expect(img).toHaveAttribute("src", srcDark);
  });
});
