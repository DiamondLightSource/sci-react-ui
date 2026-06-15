import { fireEvent, render, screen } from "@testing-library/react";
import { Image } from "./Image";

import placeholderStaticImport from "../../public/images/diamond.jpg";

describe("Image", () => {
  it("should render spinner while image isn't loaded", () => {
    render(<Image src={placeholderStaticImport} alt={"foo"} />);

    const image = screen.getByAltText("foo");

    expect(image).toHaveAttribute("aria-busy", "true");

    fireEvent.load(image);

    expect(image).toHaveAttribute("aria-busy", "false");
  });

  it("should render placeholder image if an error occurs while loading image", () => {
    render(<Image src={placeholderStaticImport} alt={"foo"} />);

    const image = screen.getByAltText("foo");
    fireEvent.error(image);

    expect(image).toHaveAttribute("aria-errormessage", "Image not available");
  });
});
