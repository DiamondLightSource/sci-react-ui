import * as React from "react";
import MuiTextareaAutosize from "@mui/material/TextareaAutosize";

export type TextareaAutosizeProps = React.ComponentProps<
  typeof MuiTextareaAutosize
>;

export const TextareaAutosize = (props: TextareaAutosizeProps) => (
  <MuiTextareaAutosize {...props} />
);
