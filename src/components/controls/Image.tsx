"use client";
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  SyntheticEvent,
  useState,
} from "react";
import placeholder from "../../public/generic/no-image.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export interface ImageProps
  extends Omit<
    Omit<
      DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      "onLoad" | "onError"
    >,
    "src"
  > {
  src?: string | null;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Smart image component that displays a placeholder on error, and a loading indicator if the image is still loading
 */
export const Image = ({ src, alt, onLoad, onError, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (onError) {
      onError();
    }

    e.currentTarget.src = placeholder;
    setIsError(true);
  };

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }

    setIsLoading(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={props.style?.width}
      height={props.style?.height}
    >
      {isLoading && (
        <Box
          display="flex"
          width={props.style?.width}
          paddingY="3em"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
      <img
        aria-busy={isLoading}
        src={src ?? placeholder}
        aria-errormessage={isError ? "Image not available" : undefined}
        onError={handleError}
        onLoad={handleLoad}
        alt={alt ?? "Placeholder Image"}
        {...props}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100%",
          objectFit: "contain",
          display: isLoading ? "none" : "block",
          ...props.style,
        }}
      />
    </Box>
  );
};
