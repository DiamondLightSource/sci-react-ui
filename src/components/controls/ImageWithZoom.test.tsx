import { ImageWithZoom } from "./ImageWithZoom";
import { render, screen } from "@testing-library/react";

/**
 * This is particularly hard to test without visual testing (screenshot matching)
 * With unit tests, refs don't work properly, nor is it particularly useful because there might be visual changes,
 * but CSS remains the same. We should revisit this once we implement visual matching through Playwright/Vitest browser mode.
 */

vi.mock("./Image", () => ({
  Image: ({
    onLoad,
    alt,
    src,
    onClick,
  }: {
    onClick?: (e: Record<string, unknown>) => void;
    onLoad?: () => void;
    alt: string;
    src: string;
  }) => {
    if (onLoad) {
      onLoad();
    }
    if (onClick) {
      onClick({
        currentTarget: {
          getBoundingClientRect: () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 100,
          }),
        },
      });
    }
    return <img alt={alt} src={src} />;
  },
}));

describe("Image with Zoom Viewer", () => {
  it("should update brightness/contrast", () => {
    render(
      <ImageWithZoom src="foo.jpg" alt="foo" brightness={1.5} contrast={0.5} />,
    );

    // https://github.com/vitest-dev/vitest/issues/9797
    const zoomView = screen.getByLabelText("Zoom View");
    expect(zoomView).toHaveAttribute(
      "style",
      expect.stringContaining("brightness(1.5)"),
    );
    expect(zoomView).toHaveAttribute(
      "style",
      expect.stringContaining("contrast(0.5)"),
    );
  });

  it("should update image colour inversion", () => {
    render(<ImageWithZoom src="foo.jpg" alt="foo" invert={true} />);

    const zoomView = screen.getByLabelText("Zoom View");
    expect(zoomView).toHaveAttribute(
      "style",
      expect.stringContaining("invert(1)"),
    );
  });
});
