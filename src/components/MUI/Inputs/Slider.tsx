import * as React from "react";
import MuiSlider, { SliderProps as MuiSliderProps } from "@mui/material/Slider";

export type SliderProps = MuiSliderProps;

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  (props, ref) => <MuiSlider ref={ref} {...props} />,
);

Slider.displayName = "Slider";
