import * as React from "react";
import MuiFade from "@mui/material/Fade";
import MuiGrow from "@mui/material/Grow";
import MuiSlide from "@mui/material/Slide";
import MuiCollapse from "@mui/material/Collapse";
import MuiZoom from "@mui/material/Zoom";

export type FadeProps = React.ComponentProps<typeof MuiFade>;
export type GrowProps = React.ComponentProps<typeof MuiGrow>;
export type SlideProps = React.ComponentProps<typeof MuiSlide>;
export type CollapseProps = React.ComponentProps<typeof MuiCollapse>;
export type ZoomProps = React.ComponentProps<typeof MuiZoom>;

export const Fade = (props: FadeProps) => <MuiFade {...props} />;
export const Grow = (props: GrowProps) => <MuiGrow {...props} />;
export const Slide = (props: SlideProps) => <MuiSlide {...props} />;
export const Collapse = (props: CollapseProps) => <MuiCollapse {...props} />;
export const Zoom = (props: ZoomProps) => <MuiZoom {...props} />;

Fade.displayName = "Fade";
Grow.displayName = "Grow";
Slide.displayName = "Slide";
Collapse.displayName = "Collapse";
Zoom.displayName = "Zoom";
