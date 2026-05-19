import React from "react";
import { Box, BoxProps, Breakpoint, Container, Stack } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

type IntentColour =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

interface BarProps extends BoxProps {
  containerWidth?: false | Breakpoint;
  color?: IntentColour;
  variant?: "default" | "subtle";
}

interface BarSlotsProps extends BarProps {
  centreSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  leftSlot?: React.ReactNode;
}

const getBarStyles = (
  theme: Theme,
  color?: IntentColour,
  variant = "default",
) => {
  if (!color) {
    return {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    };
  }

  const p = theme.palette[color];

  return {
    backgroundColor: p.solid ?? p.main,
    color: p.onSolid ?? theme.palette.text.onSolid,
  };
};

const Slot = ({ children }: { children?: React.ReactNode }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={2}
    sx={{
      color: "inherit",
    }}
  >
    {children}
  </Stack>
);

/**
 * Basic bar with left / centre / right slots.
 * Uses semantic colour + surface roles from the theme.
 */
const Bar = ({
  children,
  leftSlot,
  rightSlot,
  centreSlot,
  containerWidth = "lg",
  color,
  variant = "default",
  sx,
  ...props
}: BarSlotsProps) => {
  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
          width: "100%",
          minHeight: 50,
          display: "flex",
          alignItems: "center",
          borderRadius: 0,
          ...getBarStyles(theme, color, variant),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Container
        maxWidth={containerWidth}
        sx={{ height: "100%", position: "relative" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <Slot>
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
            <Slot>{centreSlot}</Slot>
          </Box>

          <Slot>{rightSlot}</Slot>
        </Stack>
      </Container>
    </Box>
  );
};

export { Bar };
export type { BarProps, BarSlotsProps };
