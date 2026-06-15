import React from "react";
import {
  Box,
  BoxProps,
  Breakpoint,
  Container,
  Stack,
  styled,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

type BarProps = BoxProps & {
  containerWidth?: false | Breakpoint;
  surface?:
    | "primary"
    | "secondary"
    | "brand"
    | "brand-fixed"
    | "brand-fixedDim"
    | "surface"
    | "paper"
    | "background";

  variant?: "solid" | "container" | "base";
  elevation?: number;
};

type BarSlotsProps = BarProps & {
  centreSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  leftSlot?: React.ReactNode;
};

const Slot = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => (
  <Stack className={className} direction="row" alignItems="center" spacing={2}>
    {children}
  </Stack>
);

const resolveBarSurface = (
  theme: Theme,
  surface: string,
  variant: "solid" | "container" | "base",
  elevation: number,
) => {
  const baseBg =
    elevation > 0
      ? theme.palette.surface.elevated(elevation)
      : theme.palette.background.paper;

  const semantic = ["primary", "secondary", "brand"] as const;

  if (semantic.includes(surface as "primary" | "secondary" | "brand")) {
    const p = (
      surface === "brand"
        ? theme.palette.brand
        : theme.palette[surface as "primary" | "secondary"]
    )!;

    if (variant === "solid") {
      return { backgroundColor: p.solid, color: p.onSolid };
    }

    if (variant === "container") {
      return { backgroundColor: p.container, color: p.onContainer };
    }

    return { backgroundColor: baseBg, color: theme.palette.text.primary };
  }

  if (surface === "brand-fixed" || surface === "brand-fixedDim") {
    const p = theme.palette.brand!;
    return {
      backgroundColor: surface === "brand-fixed" ? p.fixed : p.fixedDim,
      color: p.onFixed,
    };
  }

  if (surface === "background") {
    return {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    };
  }

  if (surface === "surface" || surface === "paper") {
    if (variant === "container") {
      return {
        backgroundColor: theme.palette.surface.subtle,
        color: theme.palette.text.primary,
      };
    }

    if (variant === "solid") {
      return {
        backgroundColor: theme.palette.surface.strong,
        color: theme.palette.text.primary,
      };
    }

    return {
      backgroundColor: baseBg,
      color: theme.palette.text.primary,
    };
  }

  return {
    backgroundColor: baseBg,
    color: theme.palette.text.primary,
  };
};

const BoxStyled = styled(Box)<BarProps>(({ theme, ...ownerState }) => {
  const { surface = "surface", variant = "base", elevation = 0 } = ownerState;

  const { backgroundColor, color } = resolveBarSurface(
    theme,
    surface,
    variant,
    elevation,
  );

  return {
    width: "100%",
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    backgroundColor,
    color,
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
