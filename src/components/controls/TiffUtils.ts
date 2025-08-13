import * as UTIF from "utif";
import { ImageInfo } from "./ScrollableImages";

export async function extractFramesFromTiff(
  /** Splits a multi-frame Tiff into a list of png images.*/
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

export const isTiff = (image: ImageInfo): boolean => {
  return (
    image.type?.includes("tif") ||
    image.src.endsWith(".tiff") ||
    image.src.endsWith(".tif")
  );
};
