import * as React from "react";
import MuiImageList, {
  ImageListProps as MuiImageListProps,
} from "@mui/material/ImageList";

export type ImageListProps = MuiImageListProps;

export const ImageList = React.forwardRef<HTMLUListElement, ImageListProps>(
  (props, ref) => <MuiImageList ref={ref} {...props} />,
);

ImageList.displayName = "ImageList";
