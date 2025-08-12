import { Box, Button, Slider, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as UTIF from "utif";

async function extractFramesFromTiff(
  tiffSrc: string,
  alt: string,
): Promise<ImageInfo[]> {
  const response = await fetch(tiffSrc);
  const arrayBuffer = await response.arrayBuffer();
  const frames = UTIF.decode(arrayBuffer);

  const images: ImageInfo[] = [];

  let index = 1;
  for (const frame of frames) {
    UTIF.decodeImage(arrayBuffer, frame);
    const rgba = UTIF.toRGBA8(frame);

    const canvas = document.createElement("canvas");
    canvas.width = frame.width;
    canvas.height = frame.height;
    const context = canvas.getContext("2d");
    if (!context) continue;
    const imageData = context.createImageData(frame.width, frame.height);
    imageData.data.set(rgba);
    context.putImageData(imageData, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png"),
    );
    if (!blob) continue;
    console.log("we are here");
    const url = URL.createObjectURL(blob);
    images.push({
      src: url,
      alt: alt ? `${alt} ${index}` : `TIFF Image ${index}`,
      type: "image/png",
    });
    index++;
  }
  return images;
}

interface ScrollableImagesProps {
  images: ImageInfo | ImageInfo[];
  width?: number;
  height?: number;
  buttons?: boolean;
  wrapAround?: boolean;
  slider?: boolean;
  numeration?: boolean;
  backgroundColor?: string;
}

interface ImageInfo {
  src: string;
  type?: string;
  alt?: string;
}

const ScrollableImages = ({
  images,
  width = 300,
  height = 300,
  buttons = true,
  wrapAround = true,
  slider = true,
  numeration = true,
  backgroundColor = "#eee",
}: ScrollableImagesProps) => {
  const [extractedImages, setExtractedImages] = useState<ImageInfo[]>([]);

  useEffect(() => {
    async function processImages() {
      const inputImages = Array.isArray(images) ? images : [images];
      let result: ImageInfo[] = [];
      let index = 1;
      for (const image of inputImages) {
        if (image.type?.endsWith("tiff")) {
          const frames = await extractFramesFromTiff(
            image.src,
            image.alt ?? `TIFF ${index}`,
          );
          result = result.concat(frames);
        } else {
          result.push(image);
        }
        index++;
      }
      setExtractedImages(result);
    }
    processImages();
  }, [images]);
  console.log(extractedImages);

  const imageList = extractedImages.map((img, i) => (
    <img
      key={i}
      src={img.src}
      alt={img.alt ?? `Image ${String(i + 1)}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  ));
  console.log(imageList);

  const imageListLength = imageList.length;
  const renderButtons = buttons && imageListLength > 1;
  const renderSlider = slider && imageListLength > 1;
  const renderNumbers = numeration && imageListLength > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [numberValue, setNumberValue] = useState("1");
  const containerRef = useRef<HTMLDivElement>(null);

  const setCurrentIndexWrapper = (index: number) => {
    setCurrentIndex(index);
    setNumberValue((index + 1).toString());
  };

  const handlePrev = useCallback(() => {
    const newIndex = wrapAround
      ? (currentIndex - 1 + imageListLength) % imageListLength
      : Math.max(0, currentIndex - 1);
    setCurrentIndexWrapper(newIndex);
  }, [currentIndex, imageListLength, wrapAround]);

  const handleNext = useCallback(() => {
    const newIndex = wrapAround
      ? (currentIndex + 1) % imageListLength
      : Math.min(currentIndex + 1, imageListLength - 1);
    setCurrentIndexWrapper(newIndex);
  }, [currentIndex, imageListLength, wrapAround]);

  const handleSliderChange = (_event: Event, newIndex: number | number[]) => {
    setCurrentIndexWrapper(Number(newIndex));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberValue(event.target.value);
  };

  const handleNumberEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const n = parseInt(numberValue);
      let newIndex: number;
      if (isNaN(n)) {
        newIndex = currentIndex;
      } else if (n > imageListLength) {
        newIndex = imageListLength - 1;
      } else if (n < 1) {
        newIndex = 0;
      } else {
        newIndex = n - 1;
      }
      setCurrentIndexWrapper(newIndex);
    }
  };

  const handleArrowKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowLeft") handlePrev();
    else if (event.key === "ArrowRight") handleNext();
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY < 0) handlePrev();
      else if (event.deltaY > 0) handleNext();
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [handlePrev, handleNext]);

  useEffect(() => {
    if (currentIndex >= imageListLength && imageListLength) {
      setCurrentIndexWrapper(imageListLength - 1);
    }
  }, [imageListLength, currentIndex]);

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        style={{ width }}
        data-testid="scrollable-images"
      >
        <Box
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleArrowKeys}
          sx={{
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
              data-testid="prev-button"
            >
              <ArrowBackIcon fontSize="small" />
            </Button>
          )}
          <Box
            data-index={currentIndex}
            sx={{
              position: "relative",
              width,
              height,
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: backgroundColor,
              "& .slider-wrapper": { display: "none" },
              "&:hover .slider-wrapper": { display: "flex" },
            }}
            data-testid="image-container"
          >
            {imageList[currentIndex]}
            {renderSlider && (
              <Box
                className="slider-wrapper"
                sx={{
                  position: "absolute",
                  width: width,
                  bottom: 0,
                  paddingBottom: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Slider
                  min={0}
                  max={imageListLength - 1}
                  value={currentIndex}
                  onChange={handleSliderChange}
                  sx={{ width: "75%" }}
                  data-testid="slider"
                />
              </Box>
            )}
          </Box>

          {renderButtons && (
            <Button
              onClick={handleNext}
              size="small"
              sx={{ minWidth: 36, width: 36, height: 36 }}
              data-testid="next-button"
            >
              <ArrowForwardIcon fontSize="small" />
            </Button>
          )}
        </Box>
        {renderNumbers && (
          <Box sx={{ display: "flex" }}>
            <Box
              data-testid="numeration"
              component="input"
              type="number"
              value={numberValue}
              defaultValue={""}
              onChange={handleNumberChange}
              onKeyDown={handleNumberEnter}
              sx={{
                width: "49%",
                fontSize: "1rem",
                outline: "none",
                border: "none",
                backgroundColor: "transparent",
                color: "inherit",
                textAlign: "right",
                fontFamily: "inherit",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "textfield",

                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            ></Box>
            <Box
              sx={{ fontFamily: "inherit", fontSize: "1rem", color: "inherit" }}
            >
              {`/${String(imageListLength)}`}
            </Box>
          </Box>
        )}
      </Stack>
    </>
  );
};

export { ScrollableImages };
export type { ScrollableImagesProps, ImageInfo };
