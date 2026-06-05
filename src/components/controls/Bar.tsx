import React from "react";
import {
  Box,
  BoxProps,
  Breakpoint,
  Container,
  LinkProps,
  Stack,
  styled,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

type IntentColour =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

interface SlotProps extends BoxProps, React.PropsWithChildren {
  className: string;
}

const Slot = ({ className, children }: SlotProps) => (
  <Stack className={className} direction="row" alignItems="center" spacing={2}>
    {children}
  </Stack>
);

interface BarProps extends BoxProps {
  containerWidth?: false | Breakpoint;
  color?: IntentColour;
  variant?: "default" | "subtle";
}

interface BarSlotsProps extends BarProps {
  centreSlot?: React.ReactElement<LinkProps>;
  rightSlot?: React.ReactElement<LinkProps>;
  leftSlot?: React.ReactElement<LinkProps>;
}

const BoxStyled = styled(Box)<BarProps>(({
  theme,
  color,
  variant = "default",
}: {
  theme: Theme;
  color?: IntentColour;
  variant?: "default" | "subtle";
}) => {
  let styles;

  if (!color) {
    styles = {
      backgroundColor:
        variant === "subtle"
          ? theme.palette.surface.subtle
          : theme.palette.background.paper,
      color: theme.palette.text.primary,
    };
  } else {
    const p = theme.palette[color];

    styles =
      variant === "subtle"
        ? {
            backgroundColor: p.container,
            color: p.onContainer,
          }
        : {
            backgroundColor: p.solid,
            color: p.onSolid,
          };
  }

  return {
    width: "100%",
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    ...styles,
  };
});

/**
 * Basic bar. Comes with three slots, and adjustable width. Children are placed in the left slot.
 */
const Bar = ({
  children,
  leftSlot,
  rightSlot,
  centreSlot,
  containerWidth,
  ...props
}: BarSlotsProps) => (
  <BoxStyled {...props}>
    <Container maxWidth={containerWidth} sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%", width: "100%" }}
      >
        <Slot className="left-slot">
          {leftSlot}
          {children}
        </Slot>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Slot className="centre-slot">{centreSlot}</Slot>
        </Box>

        <Slot className="right-slot">{rightSlot}</Slot>
      </Stack>
    </Container>
  </BoxStyled>
);

export { Bar };
export type { BarProps, BarSlotsProps };
