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
  /** When light, the light image will appear in both light and dark mode and vice-versa. Takes priority over tone when both are defined. */
  fixedTone?: "light" | "dark";
  /** When inverse, the light image will appear in dark mode and vice-versa. */
  tone?: "default" | "inverse";
  /** Additional styles to pass to the underlying img tag. */
  style?: React.CSSProperties;
  /**
   * @deprecated Use `tone="inverse"` instead.
   * When true, forces the inverse logo.
   */
  interchange?: boolean;
}

const ImageColourSchemeSwitch = ({
  image,
  fixedTone = undefined,
  tone = "default",
  style,
  interchange,
}: ImageColourSchemeSwitchProps) => {
  const { mode } = useColorScheme();
  const isDark = (mode ?? "light") === "dark";

  // Keep backwards compatibility for interchange
  const effectiveTone = interchange ? "inverse" : tone;
  let src = image.src;

  if (
    image.srcDark &&
    fixedTone != "light" &&
    (fixedTone === "dark" ||
      (isDark && effectiveTone === "default") ||
      (!isDark && effectiveTone === "inverse"))
  ) {
    src = image.srcDark;
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
