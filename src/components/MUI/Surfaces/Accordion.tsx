import * as React from "react";
import MuiAccordion, {
  AccordionProps as MuiAccordionProps,
} from "@mui/material/Accordion";

export type AccordionProps = MuiAccordionProps;

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => <MuiAccordion ref={ref} {...props} />,
);

Accordion.displayName = "Accordion";
