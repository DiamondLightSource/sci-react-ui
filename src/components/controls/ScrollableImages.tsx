import { Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useRef, useState } from "react";

interface ScrollableImagesProps {
  images: ImageInfo | ImageInfo[];
  width?: number;
  height?: number;
  buttons?: boolean;
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex(
      (prev: number) => (prev - 1 + imageList.length) % imageList.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev: number) => (prev + 1) % imageList.length);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY < 0) {
        handlePrev();
      } else {
        handleNext();
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [handlePrev, handleNext]);

  return (
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
          style={{
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
  );
};

export { ScrollableImages };
export type { ScrollableImagesProps, ImageInfo };
