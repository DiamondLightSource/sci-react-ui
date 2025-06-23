import { Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useRef, useState } from "react";

interface ScrollableImagesProps {
  images: ImageInfo | ImageInfo[];
  width?: number;
  height?: number;
  buttons?: boolean;
  wrapAround?: boolean;
  slider?: boolean;
}

interface ImageInfo {
  src: string;
  alt?: string;
}

const ScrollableImages = ({
  images,
  width = 300,
  height = 300,
  buttons = true,
  wrapAround = true,
  slider = true,
}: ScrollableImagesProps) => {
  const imageList = (Array.isArray(images) ? images : [images]).map(
    (img, i) => (
      <img
        key={i}
        src={img.src}
        alt={img.alt ?? "Image"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    ),
  );

  const renderButtons = buttons && imageList.length > 1;
  const renderSlider = slider && imageList.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev: number) =>
      wrapAround
        ? (prev - 1 + imageList.length) % imageList.length
        : Math.max(0, prev - 1),
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev: number) =>
      wrapAround
        ? (prev + 1) % imageList.length
        : Math.min(prev + 1, imageList.length - 1),
    );
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY < 0) {
        handlePrev();
      } else if (event.deltaY > 0) {
        handleNext();
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [handlePrev, handleNext]);

  return (
    <>
      <style>
        {`
          .slider-wrapper {
            display: none;
          }
          .image-container:hover .slider-wrapper {
            display: flex;
          }
        `}
      </style>

      <Stack direction="column" alignItems="center" style={{ width }}>
        <div
          ref={containerRef}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderButtons && (
            <Button
              onClick={handlePrev}
              size="small"
              sx={{ minWidth: 36, width: 36, height: 36 }}
            >
              <ArrowBackIcon fontSize="small" />
            </Button>
          )}
          <div
            className="image-container"
            style={{
              position: "relative",
              width,
              height,
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#eee",
            }}
          >
            {imageList[currentIndex]}
            {renderSlider && <div
              className="slider-wrapper"
              style={{
                position: "absolute",
                width: width,
                bottom: 0,
                paddingBottom: "8px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="range"
                min={0}
                max={imageList.length - 1}
                value={currentIndex}
                onChange={(e) => setCurrentIndex(Number(e.target.value))}
                style={{ width: "80%" }}
              />
            </div>}
          </div>

          {renderButtons && (
            <Button
              onClick={handleNext}
              size="small"
              sx={{ minWidth: 36, width: 36, height: 36 }}
            >
              <ArrowForwardIcon fontSize="small" />
            </Button>
          )}
        </div>
        <div>
          {currentIndex + 1}/{imageList.length}
        </div>
      </Stack>
    </>
  );
};

export { ScrollableImages };
export type { ScrollableImagesProps, ImageInfo };
