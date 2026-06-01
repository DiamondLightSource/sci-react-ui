import { useColorScheme } from "@mui/material";
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
  /** When inverse, the light image will appear in dark mode and vice-versa. */
  tone?: "default" | "inverse";
  /** Additional styles to pass to the underlying img tag. */
  style?: React.CSSProperties;
}

const ImageColourSchemeSwitch = ({
  image,
  tone = "default",
  style,
}: ImageColourSchemeSwitchProps) => {
  const { mode } = useColorScheme();
  const isDark = (mode ?? "light") === "dark";

  let src = image.src;

  if (image.srcDark) {
    if (tone === "inverse") {
      src = image.srcDark;
    } else {
      src = isDark ? image.srcDark : image.src;
    }
  }

  return (
    <img
      data-testid={mode === "dark" ? "image-dark" : "image-light"}
      src={src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      style={style}
    />
  );
};

export { ImageColourSchemeSwitch };
export type { ImageColourSchemeSwitchProps, ImageColourSchemeSwitchType };
