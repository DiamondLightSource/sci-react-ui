import { ImageInfo, ScrollableImages } from "./ScrollableImages";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../__test-utils__/helpers";

const imagesList: ImageInfo[] = [
  { src: "one", alt: "one" },
  { src: "two", alt: "two" },
  { src: "three", alt: "three" },
  { src: "four", alt: "four" },
];

describe("ScrollableImages – viewer mode", () => {
  it("should render", () => {
    const { getByTestId } = renderWithProviders(
      <ScrollableImages images={imagesList} />,
    );
    expect(getByTestId("scrollable-images")).toBeInTheDocument();
    expect(getByTestId("image-container")).toBeInTheDocument();
  });

  it("should render buttons by default", () => {
    renderWithProviders(<ScrollableImages images={imagesList} />);
    expect(screen.getByTestId("prev-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
  });

  it("should not render buttons when buttons is false", () => {
    renderWithProviders(
      <ScrollableImages images={imagesList} buttons={false} />,
    );
    expect(screen.queryByTestId("prev-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
  });

  it("should render slider by default", () => {
    renderWithProviders(<ScrollableImages images={imagesList} />);
    expect(screen.getByTestId("slider")).toBeInTheDocument();
  });

  it("should not render slider when slider is false", () => {
    renderWithProviders(
      <ScrollableImages images={imagesList} slider={false} />,
    );
    expect(screen.queryByTestId("slider")).not.toBeInTheDocument();
  });

  it("should render numeration by default", () => {
    renderWithProviders(<ScrollableImages images={imagesList} />);
    expect(screen.getByTestId("numeration")).toBeInTheDocument();
  });

  it("should not render numeration when numeration is false", () => {
    renderWithProviders(
      <ScrollableImages images={imagesList} numeration={false} />,
    );
    expect(screen.queryByTestId("numeration")).not.toBeInTheDocument();
  });

  it("should wrap around by default", () => {
    renderWithProviders(<ScrollableImages images={imagesList} />);
    fireEvent.click(screen.getByTestId("prev-button"));
    expect(screen.getByTestId("image-container")).toHaveAttribute(
      "data-index",
      "3",
    );
  });

  it("should not wrap when wrapAround is false", () => {
    renderWithProviders(
      <ScrollableImages images={imagesList} wrapAround={false} />,
    );
    const imageContainer = screen.getByTestId("image-container");

    fireEvent.click(screen.getByTestId("prev-button"));
    expect(imageContainer).toHaveAttribute("data-index", "0");

    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(imageContainer).toHaveAttribute("data-index", "3");
  });

  it("should not render controls with only one image", () => {
    renderWithProviders(<ScrollableImages images={[imagesList[0]]} />);
    expect(screen.queryByTestId("numeration")).not.toBeInTheDocument();
    expect(screen.queryByTestId("slider")).not.toBeInTheDocument();
    expect(screen.queryByTestId("prev-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
  });

  it("should respond to arrow keys when focused", () => {
    renderWithProviders(<ScrollableImages images={imagesList} />);
    const container = screen.getByTestId("image-container");
    container.focus();

    fireEvent.keyDown(container, { key: "ArrowRight" });
    expect(container).toHaveAttribute("data-index", "1");

    fireEvent.keyDown(container, { key: "ArrowLeft" });
    expect(container).toHaveAttribute("data-index", "0");
  });

  it("should not respond to arrow keys when not focused", () => {
    renderWithProviders(<ScrollableImages images={imagesList} />);
    const container = screen.getByTestId("image-container");

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(container).toHaveAttribute("data-index", "0");
  });
});

describe("ScrollableImages – scroll mode", () => {
  it("should render scroll container", () => {
    renderWithProviders(<ScrollableImages images={imagesList} mode="scroll" />);
    expect(screen.getByTestId("image-scroll-container")).toBeInTheDocument();
  });

  it("should render left and right scroll buttons", () => {
    renderWithProviders(<ScrollableImages images={imagesList} mode="scroll" />);
    expect(screen.getByTestId("scroll-left-button")).toBeInTheDocument();
    expect(screen.getByTestId("scroll-right-button")).toBeInTheDocument();
  });

  it("should render all images in scroll mode", () => {
    renderWithProviders(<ScrollableImages images={imagesList} mode="scroll" />);

    imagesList.forEach((_, index) => {
      expect(
        screen.getByTestId(`scroll-image-${index + 1}`),
      ).toBeInTheDocument();
    });
  });

  it.skip("should call scrollBy when clicking scroll buttons", () => {
    renderWithProviders(<ScrollableImages images={imagesList} mode="scroll" />);

    const container = screen.getByTestId("image-scroll-container");

    Object.defineProperty(container, "scrollBy", {
      value: vi.fn(),
      writable: true,
    });

    fireEvent.click(screen.getByTestId("scroll-right-button"));
    expect(container.scrollBy).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("scroll-left-button"));
    expect(container.scrollBy).toHaveBeenCalled();
  });

  it("should not render viewer-only controls in scroll mode", () => {
    renderWithProviders(<ScrollableImages images={imagesList} mode="scroll" />);

    expect(screen.queryByTestId("slider")).not.toBeInTheDocument();
    expect(screen.queryByTestId("numeration")).not.toBeInTheDocument();
    expect(screen.queryByTestId("prev-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
  });
});
