import { ImageInfo, ScrollableImages } from "./ScrollableImages";
import { screen, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

const imagesList: ImageInfo[] = [
  { src: "one", alt: "one" },
  { src: "two", alt: "two" },
  { src: "three", alt: "three" },
  { src: "four", alt: "four" },
];

describe("ScrollableImages", () => {
  it("should render", () => {
    const { getByTestId } = render(<ScrollableImages images={imagesList} />);
    expect(getByTestId("scrollable-images")).toBeInTheDocument();
    expect(getByTestId("image-container")).toBeInTheDocument();
  });

  it("should render buttons by default", () => {
    const { getByTestId } = render(<ScrollableImages images={imagesList} />);
    expect(getByTestId("prev-button")).toBeInTheDocument();
    expect(getByTestId("next-button")).toBeInTheDocument();
  });

  it("should not render buttons when buttons is false", () => {
    const { queryByTestId } = render(
      <ScrollableImages images={imagesList} buttons={false} />,
    );
    expect(queryByTestId("prev-button")).not.toBeInTheDocument();
    expect(queryByTestId("next-button")).not.toBeInTheDocument();
  });

  it("should render slider by default", () => {
    const { getByTestId } = render(<ScrollableImages images={imagesList} />);
    expect(getByTestId("slider")).toBeInTheDocument();
  });

  it("should not render slider when slider is false", () => {
    const { queryByTestId } = render(
      <ScrollableImages images={imagesList} slider={false} />,
    );
    expect(queryByTestId("slider")).not.toBeInTheDocument();
  });

  it("should render numeration by default", () => {
    const { getByTestId } = render(<ScrollableImages images={imagesList} />);
    expect(getByTestId("numeration")).toBeInTheDocument();
  });

  it("should not render numeration when numeration is false", () => {
    const { queryByTestId } = render(
      <ScrollableImages images={imagesList} numeration={false} />,
    );
    expect(queryByTestId("numeration")).not.toBeInTheDocument();
  });

  it("should wrap from first image to last", () => {
    render(<ScrollableImages images={imagesList} />);
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toHaveAttribute("data-index", "3");
  });

  it("should wrap from last image to first", () => {
    render(<ScrollableImages images={imagesList} />);
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toHaveAttribute("data-index", "0");
  });

  it("should wrap from first image to last", () => {
    render(<ScrollableImages images={imagesList} />);
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toHaveAttribute("data-index", "3");
  });

  it("should not wrap when wrapAround is false", () => {
    render(<ScrollableImages images={imagesList} wrapAround={false} />);
    const nextButton = screen.getByTestId("next-button");
    const prevButton = screen.getByTestId("prev-button");
    const imageContainer = screen.getByTestId("image-container");

    expect(imageContainer).toHaveAttribute("data-index", "0");

    fireEvent.click(prevButton);
    expect(imageContainer).toHaveAttribute("data-index", "0");

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(imageContainer).toHaveAttribute("data-index", "3");
  });

  it("should not render these components when only one image given", () => {
    const { queryByTestId } = render(
      <ScrollableImages images={[imagesList[0]]} />,
    );
    expect(queryByTestId("numeration")).not.toBeInTheDocument();
    expect(queryByTestId("slider")).not.toBeInTheDocument();
    expect(queryByTestId("prev-button")).not.toBeInTheDocument();
    expect(queryByTestId("next-button")).not.toBeInTheDocument();
  });

  it("should be able to scroll with arrow keys", () => {
    render(<ScrollableImages images={imagesList} />);
    const imageContainer = screen.getByTestId("image-container");

    fireEvent.keyDown(imageContainer, {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    expect(imageContainer).toHaveAttribute("data-index", "1");

    fireEvent.keyDown(imageContainer, { key: "ArrowLeft", code: "ArrowLeft" });
    expect(imageContainer).toHaveAttribute("data-index", "0");
  });

  it("should not scroll with arrow keys if the component is not targeted", () => {
    render(<ScrollableImages images={imagesList} />);
    const imageContainer = screen.getByTestId("image-container");

    expect(imageContainer).toHaveAttribute("data-index", "0");
    fireEvent.keyDown(window, { key: "ArrowRight", code: "ArrowRight" });
    expect(imageContainer).toHaveAttribute("data-index", "0");
    fireEvent.keyDown(window, { key: "ArrowLeft", code: "ArrowLeft" });
    expect(imageContainer).toHaveAttribute("data-index", "0");
  });
});
