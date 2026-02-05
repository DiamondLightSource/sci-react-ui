import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Slider, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { extractFramesFromTiff, isTiff } from "../../utils/TiffUtils";

interface ScrollableImagesProps {
  images: ImageInfo | ImageInfo[];
  width?: number;
  height?: number;
  scrollStep?: number;
  mode?: "viewer" | "scroll";
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
  mode = "viewer",
  buttons = true,
  wrapAround = true,
  slider = true,
  numeration = true,
  backgroundColor = "#eee",
  scrollStep = 320,
}: ScrollableImagesProps) => {
  const [imageList, setImageList] = useState<ImageInfo[]>([]);

  const handleArrowKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowLeft") handlePrev();
    else if (event.key === "ArrowRight") handleNext();
  };

  useEffect(() => {
    (async () => {
      const inputImages = Array.isArray(images) ? images : [images];
      let result: ImageInfo[] = [];
      let index = 1;
      for (const image of inputImages) {
        if (isTiff(image)) {
          const frames: ImageInfo[] = await extractFramesFromTiff({
            src: image.src,
            alt: image.alt ?? `TIFF ${index}`,
          });
          result = result.concat(frames);
        } else {
          result.push(image);
        }
        index++;
      }

      if (currentIndex >= result.length) {
        setCurrentIndex(Math.max(0, result.length - 1));
      }

      setImageList(result);
    })();
  }, [images]);

  //  CS - Standard mode
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageCount = imageList.length;

  const setIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = useCallback(() => {
    const newIndex = wrapAround
      ? (currentIndex - 1 + imageCount) % imageCount
      : Math.max(0, currentIndex - 1);
    setIndex(newIndex);
  }, [currentIndex, imageCount, wrapAround]);

  const handleNext = useCallback(() => {
    const newIndex = wrapAround
      ? (currentIndex + 1) % imageCount
      : Math.min(imageCount - 1, currentIndex + 1);
    setIndex(newIndex);
  }, [currentIndex, imageCount, wrapAround]);
  //  CE - Standard mode

  // CS - Scroll mode
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -scrollStep, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: scrollStep, behavior: "smooth" });
  // CE - Scroll mode

  if (!imageCount) return null;

  if (mode === "scroll") {
    return (
      <Box
        data-testid="image-scroll-container"
        sx={{ position: "relative", width: "100%" }}
      >
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "#4C5266",
            color: "white",
          }}
        >
          <ArrowBackIosNewIcon data-testid="scroll-left-button" />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: "1rem",
            padding: "1rem 3rem",
            scrollSnapType: "x mandatory",
          }}
        >
          {imageList.map((img, i) => (
            <Box
              key={i}
              sx={{
                width,
                height,
                flexShrink: 0,
                scrollSnapAlign: "start",
                backgroundColor,
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                data-testid={`scroll-image-${i + 1}`}
                src={img.src}
                alt={img.alt ?? `Image ${i + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "#4C5266",
            color: "white",
          }}
        >
          <ArrowForwardIosIcon data-testid="scroll-right-button" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Stack data-testid="scrollable-images" alignItems="center" sx={{ width }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {buttons && imageCount > 1 && (
          <Button
            aria-label="Previous Image"
            onClick={handlePrev}
            size="small"
            sx={{ minWidth: 36, width: 36, height: 36 }}
          >
            <ArrowBackIcon data-testid="prev-button" />
          </Button>
        )}

        <Box
          data-testid="image-container"
          data-index={currentIndex}
          tabIndex={0}
          onKeyDown={handleArrowKeys}
          sx={{
            width,
            height,
            backgroundColor,
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={imageList[currentIndex].src}
            alt={imageList[currentIndex].alt ?? ""}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />

          {slider && imageCount > 1 && (
            <Box sx={{ position: "absolute", bottom: 8, width: "75%" }}>
              <Slider
                data-testid="slider"
                min={0}
                max={imageCount - 1}
                value={currentIndex}
                onChange={(_, v) => setIndex(Number(v))}
              />
            </Box>
          )}
        </Box>

        {buttons && imageCount > 1 && (
          <Button
            aria-label="Next Image"
            onClick={handleNext}
            size="small"
            sx={{ minWidth: 36, width: 36, height: 36 }}
          >
            <ArrowForwardIcon data-testid="next-button" />
          </Button>
        )}
      </Box>

      {numeration && imageCount > 1 && (
        <Box
          aria-label="Total Images Numeration"
          data-testid="numeration"
          sx={{ mt: 1 }}
        >
          {currentIndex + 1}/{imageCount}
        </Box>
      )}
    </Stack>
  );
};

export { ScrollableImages };
export type { ImageInfo };
