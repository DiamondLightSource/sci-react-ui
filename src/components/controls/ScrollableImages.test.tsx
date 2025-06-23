import { ImageInfo, ScrollableImages } from "./ScrollableImages";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const imagesList: ImageInfo[] = [
  { src: "one", alt: "one" },
  { src: "two", alt: "two" },
  { src: "three", alt: "three" },
  { src: "four", alt: "four" },
];

describe("ScrollableImages", () => {
  it("should render buttons by default", () => {
    const { getByTestId } = render(<ScrollableImages images={imagesList} />);
    expect(getByTestId("prev-button")).toBeInTheDocument();
    expect(getByTestId("next-button")).toBeInTheDocument();
  });

  it("should render slider by default", () => {
    const { getByTestId } = render(<ScrollableImages images={imagesList} />);
    expect(getByTestId("slider")).toBeInTheDocument();
  });

  it("should render numeration by default", () => {
    const { getByTestId } = render(<ScrollableImages images={imagesList} />);
    expect(getByTestId("numeration")).toBeInTheDocument();
  });
});
