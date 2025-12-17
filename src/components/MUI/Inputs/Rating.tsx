import * as React from "react";
import MuiRating, { RatingProps as MuiRatingProps } from "@mui/material/Rating";

export type RatingProps = MuiRatingProps;

export const Rating = React.forwardRef<HTMLSpanElement, RatingProps>(
  (props, ref) => <MuiRating ref={ref} {...props} />,
);

Rating.displayName = "Rating";
