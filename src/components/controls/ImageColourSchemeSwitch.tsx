import { styled } from "@mui/material";
import React from "react";


type ImageColourSchemeSwitchType = {
  /** The src for the light version. */
  src: string;
  /** The src for the dark version. */
  srcDark?: string;
  /** Alternative text to show instead of the image. */
  alt: string;
  /** A specific width. */
  width?: string;
  /** A specific height. */
  height?: string;
};

interface ImageColourSchemeSwitchProps {
  /** The definition for the two images. */
  image: ImageColourSchemeSwitchType;
  /** When true, the light image will appear in dark mode and vice-versa. */
  interchange?: boolean
  /** Additional styles to pass to the underlying img tag. */
  style?: React.CSSProperties;
}

/** Styled component which is only displayed in dark mode. */
const ImageDark = styled("img")(({ theme }) => [
  { display: "none" },
  theme.applyStyles("dark", {
    display: "block",
  }),
]);

/** Styled component which is only displayed in light mode. */
const ImageLight = styled("img")(({ theme }) => [
  { display: "block" },
  theme.applyStyles("dark", {
    display: "none",
  }),
]);

/**
 * Switch between two different images depending on the current color scheme selected (light or dark).
 */
const ImageColourSchemeSwitch = ({
  image,
  interchange,
  style
}: ImageColourSchemeSwitchProps) =>
  image.srcDark ? (
    <>
      <ImageLight
        data-testid="image-light"
        src={!interchange ? image.src : image.srcDark}
        alt={image.alt}
        width={image.width}
        height={image.height}
        style={style}
      />
      <ImageDark
        data-testid="image-dark"
        src={!interchange ? image.srcDark : image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        style={style}
      />
    </>
  ) : (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      style={style}
    />
  );

export { ImageColourSchemeSwitch };
export type { ImageColourSchemeSwitchProps, ImageColourSchemeSwitchType };
