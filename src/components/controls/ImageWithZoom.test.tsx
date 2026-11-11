import { useEffect } from "react";
import { ImageWithZoom } from "./ImageWithZoom";
import { fireEvent, render, screen } from "@testing-library/react";

/**
 * This is particularly hard to test without visual testing (screenshot matching)
 * With unit tests, refs don't work properly, nor is it particularly useful because there might be visual changes,
 * but CSS remains the same. We should revisit this once we implement visual matching through Playwright/Vitest browser mode.
 *
 * The dragging tests below stub layout (jsdom has none) so that lens positions are deterministic.
 */

vi.mock("./Image", () => ({
  Image: ({
    onLoad,
    alt,
    src,
  }: {
    onLoad?: () => void;
    alt: string;
    src: string;
  }) => {
    // Fire onLoad after render (like a real <img>) rather than during it,
    // otherwise React warns about updating ImageWithZoom while rendering Image
    useEffect(() => {
      onLoad?.();
    }, []);
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

  describe("dragging", () => {
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetWidth",
    );
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetHeight",
    );

    beforeEach(() => {
      // Image container is 100x100 at the origin
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });
      // Lens and zoom view both report 20x20
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        value: 20,
      });
      Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        configurable: true,
        value: 20,
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
      if (originalOffsetWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "offsetWidth",
          originalOffsetWidth,
        );
      }
      if (originalOffsetHeight) {
        Object.defineProperty(
          HTMLElement.prototype,
          "offsetHeight",
          originalOffsetHeight,
        );
      }
    });

    const renderViewer = () => {
      render(<ImageWithZoom src="foo.jpg" alt="foo" />);
      // The mouse handlers live on the wrapper around the image + lens
      const container = screen.getByAltText("foo").parentElement!;
      return {
        container,
        lens: screen.getByLabelText("Lens"),
        zoomView: screen.getByLabelText("Zoom View").parentElement!,
      };
    };

    it("should hide the lens and zoom view until the user interacts", () => {
      const { lens, zoomView, container } = renderViewer();

      expect(lens).toHaveStyle({ display: "none" });
      expect(zoomView).toHaveStyle({ display: "none" });
      expect(container).toHaveStyle({ cursor: "crosshair" });
      expect(screen.getByText("Click or drag to zoom in")).toBeVisible();
    });

    it("should show the lens and zoom view on mouse down", () => {
      const { container, lens, zoomView } = renderViewer();

      fireEvent.mouseDown(container, { button: 0, clientX: 50, clientY: 50 });

      expect(lens).toHaveStyle({ display: "block" });
      expect(zoomView).toHaveStyle({ display: "block" });
      // Lens is centred on the cursor: 50 - (20 / 2) = 40
      expect(lens).toHaveStyle({ left: "40px", top: "40px" });
      expect(container).toHaveStyle({ cursor: "grabbing" });
      expect(screen.getByText("Click or drag to zoom in")).not.toBeVisible();
    });

    it("should move the lens while dragging", () => {
      const { container, lens } = renderViewer();

      fireEvent.mouseDown(container, { button: 0, clientX: 50, clientY: 50 });
      fireEvent.mouseMove(window, { clientX: 30, clientY: 70 });

      expect(lens).toHaveStyle({ left: "20px", top: "60px" });
    });

    it("should keep following the cursor outside the image, clamped to its bounds", () => {
      const { container, lens } = renderViewer();

      fireEvent.mouseDown(container, { button: 0, clientX: 50, clientY: 50 });

      // Far beyond the bottom-right corner, max position is 100 - lens width (20)
      fireEvent.mouseMove(window, { clientX: 500, clientY: 500 });
      expect(lens).toHaveStyle({ left: "80px", top: "80px" });

      fireEvent.mouseMove(window, { clientX: -500, clientY: -500 });
      expect(lens).toHaveStyle({ left: "0px", top: "0px" });
    });

    it("should stop following the cursor after mouse up", () => {
      const { container, lens } = renderViewer();

      fireEvent.mouseDown(container, { button: 0, clientX: 50, clientY: 50 });
      fireEvent.mouseUp(window);

      expect(container).toHaveStyle({ cursor: "crosshair" });

      fireEvent.mouseMove(window, { clientX: 10, clientY: 10 });
      expect(lens).toHaveStyle({ left: "40px", top: "40px" });
    });

    it("should not move the lens on mouse move when not dragging", () => {
      const { lens } = renderViewer();

      fireEvent.mouseMove(window, { clientX: 50, clientY: 50 });

      expect(lens).toHaveStyle({ display: "none" });
    });

    it("should remove window listeners when unmounted mid-drag", () => {
      const removeSpy = vi.spyOn(window, "removeEventListener");
      const { container } = renderViewer();

      fireEvent.mouseDown(container, { button: 0, clientX: 50, clientY: 50 });
      removeSpy.mockClear();

      screen.getByAltText("foo");
      const { unmount } = render(<ImageWithZoom src="bar.jpg" alt="bar" />);
      fireEvent.mouseDown(screen.getByAltText("bar").parentElement!, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });
      removeSpy.mockClear();
      unmount();

      const removed = removeSpy.mock.calls.map(([type]) => type);
      expect(removed).toContain("mousemove");
      expect(removed).toContain("mouseup");
    });
  });
});
