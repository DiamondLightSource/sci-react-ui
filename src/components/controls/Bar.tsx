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

  /**
   * Background family for the bar. Pairs with `variant` — see its doc for how each surface
   * responds to `solid` / `container` / `base`.
   *
   * - `primary` / `secondary` / `brand` — semantic intents. Only `solid`/`container` actually use
   *   the intent colour; `base` falls back to a plain neutral background.
   * - `brand-fixed` / `brand-fixedDim` — a persistent Diamond identity colour that stays constant
   *   across light/dark mode, unlike `brand`. `variant` is ignored.
   * - `surface` / `paper` — neutral, non-branded surface (aliases of each other).
   * - `background` — the page's own background colour. `variant` is ignored.
   */
  surface?:
    | "primary"
    | "secondary"
    | "brand"
    | "brand-fixed"
    | "brand-fixedDim"
    | "surface"
    | "paper"
    | "background";

  /**
   * How saturated the chosen `surface` is.
   *
   * - `solid` — full intent colour on a semantic surface, or the strongest neutral on `surface`/`paper`.
   * - `container` — tinted container colour on a semantic surface, or a subtle neutral tint on `surface`/`paper`.
   * - `base` (default) — plain neutral background. On a semantic surface (`primary`/`secondary`/`brand`)
   *   this does NOT apply the intent colour — it renders the same neutral background as `surface`/`base`.
   *
   * Ignored by `brand-fixed`, `brand-fixedDim`, and `background`.
   */
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
    minHeight: 48,
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
