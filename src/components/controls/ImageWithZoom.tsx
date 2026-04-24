"use client";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { clampNumber } from "../../utils/generic";
import { Image } from "./Image";
import { useWindowSize } from "../../utils/hooks";

export interface ImageWithZoomProps {
  src: string;
  alt?: string;
  /** Width of zoomed view (magnified view) */
  zoomWidth?: string;
  /** Width of lens. The zoom effect is a ratio between the lens size and the width of the magnified view. */
  lensWidth?: string;
  /** Max total width */
  maxWidth?: string;
  /** Always leave enough space on the left for the magnified view */
  alwaysPad?: boolean;
  width?: string;
  /** Whether to invert colours */
  invert?: boolean;
  /** CSS filter brightness value (0 to 2, 1 being the default) */
  brightness?: number;
  /** CSS filter contrast value (0 to 2, 1 being the default) */
  contrast?: number;
}

/**
 * Image viewer with zoomed in view that the user can move around
 */
export const ImageWithZoom = ({
  src,
  alt,
  width = "80%",
  zoomWidth = "15vh",
  maxWidth = "100vw",
  lensWidth = "4vh",
  alwaysPad = false,
  invert = false,
  brightness = 1,
  contrast = 1,
}: ImageWithZoomProps) => {
  const [isLoading, setIsLoading] = useState(true);
  // Whether or not user has already zoomed in at least once
  const [userZoomedIn, setUserZoomedIn] = useState(false);

  const [windowWidth, windowHeight] = useWindowSize();

  const lensRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  // The zoom view wrapper is a separate ref because that way it's unaffected by image filters
  const zoomViewRef = useRef<HTMLDivElement>(null);

  const { breakpoints } = useTheme();

  const imageFilter = useMemo(
    // CSS value responsible for applying filters
    () =>
      `invert(${invert ? "1" : "0"}) brightness(${brightness}) contrast(${contrast})`,
    [invert, brightness, contrast],
  );

  const moveZoomWindow = useCallback(
    (windowPos = "0", hideLens = false) => {
      if (zoomViewRef.current && zoomRef.current) {
        if (hideLens && lensRef.current) {
          lensRef.current.style.display = "none";
        }
        // Position window to left of image on larger screens
        // MUI breakpoints are not granular enough - the extra 100px is just to be on the safe side
        if (window.innerWidth > breakpoints.values.xl + 100) {
          zoomViewRef.current.style.left = "0px";
        } else {
          // Move the zoomed in view left or right depending on where the lens is
          // When the window is resized, it defaults to the left-hand side
          zoomViewRef.current.style.left = windowPos;
        }
      }
    },
    [zoomViewRef, zoomRef, lensRef, breakpoints],
  );

  // Width and height are dependencies as we need to listen to both to update the zoom window position
  useEffect(() => {
    moveZoomWindow("0", true);
  }, [windowWidth, windowHeight, moveZoomWindow]);

  useEffect(() => {
    // Reset loading indicator, user status when component is closed
    return () => {
      setIsLoading(false);
      setUserZoomedIn(false);
    };
  }, []);

  const updateMagPosition = useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      if (lensRef.current && zoomRef.current && zoomViewRef.current) {
        // The zoom window starts off hidden
        zoomViewRef.current.style.display = "block";
        lensRef.current.style.display = "block";
        setUserZoomedIn(true);

        const target = e.currentTarget.getBoundingClientRect();
        const ratioX =
          zoomRef.current.offsetWidth / lensRef.current.offsetWidth;
        const ratioY =
          zoomRef.current.offsetHeight / lensRef.current.offsetHeight;
        const halfWidth = lensRef.current.offsetWidth / 2;
        const halfHeight = lensRef.current.offsetHeight / 2;

        // Limit the lens location to within bounds
        /*
         * If you modify the lens size in the CSS file, it will result in a zoom change inversely proportional
         * to the size of the lens. The larger the lens, the lesser the zoom, and vice versa.
         * This is to keep the lens true to what is actually displayed on the zoomed in view.
         */
        const posX = clampNumber(
          e.clientX - target.left - halfWidth,
          target.width - halfWidth * 2,
        );
        const posY = clampNumber(
          e.clientY - target.top - halfHeight,
          target.height - halfHeight * 2,
        );

        lensRef.current.style.left = `${posX}px`;
        lensRef.current.style.top = `${posY}px`;

        // This moves the background in the zoom div, which corresponds to a zoomed in version of the larger
        // image.
        zoomRef.current.style.backgroundSize = `${target.width * ratioX}px ${target.height * ratioY}px`;
        zoomRef.current.style.backgroundPosition = `-${posX * ratioX}px -${posY * ratioY}px`;

        moveZoomWindow(
          posX > target.width / 2
            ? "0"
            : `${target.width - zoomRef.current.offsetWidth}px`,
        );
      }
    },
    [lensRef, zoomRef, zoomViewRef, moveZoomWindow],
  );

  return (
    <Box
      sx={{
        width: userZoomedIn ? `calc(${zoomWidth} + ${width})` : width,
        position: "relative",
        alignSelf: "center",
        maxWidth,
        paddingLeft: {
          xl: userZoomedIn || alwaysPad ? zoomWidth : 0,
          xs: 0,
        },
      }}
    >
      {!isLoading && (
        <div
          className="zoom-view"
          style={{
            display: "none",
            position: "absolute",
            zIndex: 3,
            right: zoomWidth,
            border: "3px solid red",
            width: zoomWidth,
            height: zoomWidth,
          }}
          ref={zoomViewRef}
        >
          <div
            style={{
              backgroundImage: `url(${src})`,
              filter: imageFilter,
              width: "100%",
              height: "100%",
            }}
            aria-label="Zoom View"
            ref={zoomRef}
          />
        </div>
      )}
      <div style={{ position: "relative" }}>
        {!isLoading && (
          <div
            ref={lensRef}
            aria-label="Lens"
            style={{
              display: "none",
              position: "absolute",
              width: lensWidth,
              height: lensWidth,
              border: "1px red solid",
              zIndex: 2,
            }}
          />
        )}
        <Image
          src={src}
          style={{ filter: imageFilter }}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onClick={updateMagPosition}
        />
      </div>
      {!isLoading && (
        <Typography
          bgcolor="rgba(0,0,0,0.1)"
          textAlign="center"
          variant="body1"
          width="100%"
          visibility={userZoomedIn ? "hidden" : "visible"}
        >
          Click to zoom in
        </Typography>
      )}
    </Box>
  );
};
