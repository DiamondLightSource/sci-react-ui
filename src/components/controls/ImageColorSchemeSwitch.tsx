import { styled } from "@mui/material";

type ImageColorSchemeSwitchType = {
  src: string;
  srcDark?: string;
  alt: string;
  width?: string;
  height?: string;
};

interface ImageColorSchemeSwitchProps {
  image: ImageColorSchemeSwitchType;
}

/** Styled component which is only displayed in dark mode */
const ImageDark = styled("img")(({ theme }) => [
  { display: "none" },
  theme.applyStyles("dark", {
    display: "block",
  }),
]);

/** Styled component which is only displayed in light mode */
const ImageLight = styled("img")(({ theme }) => [
  { display: "block" },
  theme.applyStyles("dark", {
    display: "none",
  }),
]);

const ImageColorSchemeSwitch = ({ image }: ImageColorSchemeSwitchProps) => (
  <>
    <ImageLight
      data-testid="image-light"
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
    <ImageDark
      data-testid="image-dark"
      src={image.srcDark}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
  </>
);

export { ImageColorSchemeSwitch };
export type { ImageColorSchemeSwitchProps, ImageColorSchemeSwitchType };
