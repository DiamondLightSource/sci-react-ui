import * as React from "react";
import MuiModal from "@mui/material/Modal";

export type ModalProps = React.ComponentProps<typeof MuiModal>;

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, ref) => <MuiModal ref={ref} {...props} />,
);
